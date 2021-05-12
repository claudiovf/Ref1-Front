import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Team } from '../../types';
import { BackHome, StyledLink, ProfileContainer, Spacer, ProfileName, ProfileWrap, GenAchContainer, H1 } from '../LayoutComponents';
import Spinner from '../Common/Spinner';

import TeamStatSection from './StatSection/TeamStatSection';
import TeamInfo from './TeamInfo';


import { TEAM_PROFILE } from '../../queries';
import TeamAchievements from './TeamAchievements';
import { getDriverStyle, invertStyle } from '../../utils/currentInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import styled from 'styled-components';

const TeamProfileWrap = styled(ProfileWrap)<{bg: string}>`
    background-color: ${props => props.bg}
`;

const TeamProfile: React.FC = () => {
    const [ team, setTeam ] = useState<Team | null>(null);
    
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const { constructorId } = useParams<{ constructorId: string }>();
    const { loading, data } = useQuery<{ findTeam: Team }>(TEAM_PROFILE, { 
        variables: { constructorId },
        fetchPolicy: "cache-and-network" 
    });
    
    useEffect(() => {
        if ( data ) {
            setTeam(data.findTeam);
        }
    }, [data]);

    
    
    if ( loading ) return <> <Spacer /><Spinner /> </>;

    if ( !team ) return null;

    return (
        <React.Fragment>
            <ProfileContainer>
                <StyledLink to="/">
                    <BackHome darkMode={settings.isDarkMode}>
                        &larr;&nbsp;&nbsp;{team.name}
                    </BackHome>
                </StyledLink>
                <Spacer />
                <TeamProfileWrap bg={invertStyle(settings.isDarkMode, getDriverStyle(team.constructorId)).primary }>
                    <ProfileName 
                        color={invertStyle(settings.isDarkMode, getDriverStyle(team.constructorId)).secondary}
                        >
                        <H1>{getDriverStyle(team.constructorId).team === "NA" 
                        ? team.name.toUpperCase() : getDriverStyle(team.constructorId).team.toUpperCase()}</H1>
                        </ProfileName>
                    <GenAchContainer>
                        <TeamInfo team={team} />
                        <TeamAchievements team={team} />
                    </GenAchContainer>
                    <TeamStatSection 
                        team={team} />
                </TeamProfileWrap>
            </ProfileContainer>
        </React.Fragment>
    );
};

export default TeamProfile;