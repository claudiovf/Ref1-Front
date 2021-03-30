import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Team } from '../../types';
import { BackHome, StyledLink, ProfileContainer, Spacer, ProfileName, ProfileWrap, GenAchContainer } from '../LayoutComponents';
import Spinner from '../Common/Spinner';

import TeamStatSection from './StatSection/TeamStatSection';
import TeamInfo from './TeamInfo';


import { TEAM_PROFILE } from '../../queries';
import TeamAchievements from './TeamAchievements';
import { getDriverStyle } from '../../utils/currentInfo';



const TeamProfile: React.FC = () => {
    const [ team, setTeam ] = useState<Team | null>(null);
    

    const { constructorId } = useParams<{ constructorId: string }>();
    const { loading, data } = useQuery<{ findTeam: Team }>(TEAM_PROFILE,
          { variables: { constructorId } });
    
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
                    <BackHome>
                        &larr;&nbsp;&nbsp;{team.name}
                    </BackHome>
                </StyledLink>
                <Spacer />
                <ProfileWrap>
                    <ProfileName 
                        color={getDriverStyle(team.constructorId).secondary}
                        bg={getDriverStyle(team.constructorId).primary}>
                        {getDriverStyle(team.constructorId).team === "NA" 
                        ? team.name.toUpperCase() : getDriverStyle(team.constructorId).team.toUpperCase()}</ProfileName>
                    <GenAchContainer contBg={getDriverStyle(team.constructorId).primary}>
                        <TeamInfo team={team} />
                        <TeamAchievements team={team} />
                    </GenAchContainer>
                    <TeamStatSection 
                        team={team} />
                </ProfileWrap>
            </ProfileContainer>
        </React.Fragment>
    );
};

export default TeamProfile;