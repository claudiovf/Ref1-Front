import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Team } from '../../types';
import { BackHome, StyledLink, ProfileContainer, Spacer } from '../LayoutComponents';
import Spinner from '../Common/Spinner';

import TeamStatSection from './StatSection/TeamStatSection';
import TeamInfo from './TeamInfo';


import { TEAM_PROFILE } from '../../queries';
import TeamAchievements from './TeamAchievements';



const TeamProfile: React.FC = () => {
    const [ team, setTeam ] = useState<Team | null>(null);
    const [ period, setPeriod ] = useState<string>("All Time");
    

    const { constructorId } = useParams<{ constructorId: string }>();
    const { loading, data } = useQuery<{ findTeam: Team }>(TEAM_PROFILE,
          { variables: { constructorId } });
    
    useEffect(() => {
        if ( data ) {
            setTeam(data.findTeam);
            setPeriod("All Time");
        }
    }, [data, period]);

    const changeProfilePeriod = ( period: string ) => {
        setPeriod(period);
    };
    
    
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
                <TeamInfo team={team} />
                <TeamAchievements team={team} />
                <TeamStatSection 
                    team={team} 
                    period={period} 
                    changeProfilePeriod={changeProfilePeriod} />
            </ProfileContainer>
        </React.Fragment>
    );
};

export default TeamProfile;