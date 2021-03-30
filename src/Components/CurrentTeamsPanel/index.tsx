import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import Spinner from '../Common/Spinner';
import CurrentTeamCards from './CurrentTeamCards';
import { useQuery } from '@apollo/client';
import { Team } from '../../types';
import { GET_SEASON_TEAMS } from '../../queries';



const CurrentTeamsPanel: React.FC = () => {
    const teamsList = [
        'mercedes', 'red_bull', 'mclaren', 'aston_martin', 
        'alpine', 'ferrari', 'alphatauri', 'alfa', 
        'haas', 'williams'
    ];
    
    const { loading, data } = useQuery<{ findManyTeams: Team[] }>(GET_SEASON_TEAMS,
        { variables: { teamsList } });

    
 
        

    return (
        <React.Fragment>
            <Section>  
                <Title>2020 Teams</Title>
                    { loading ? <Spinner /> : null}
                <Scroll>
                    { data ?  (
                        teamsList.map(team => {
                            const teamToDisplay = data.findManyTeams.find(t => t.constructorId === team);

                            if(!teamToDisplay) return null;

                            return (
                                <CurrentTeamCards 
                                    team={teamToDisplay} 
                                    key={teamToDisplay.constructorId} />
                            );
                        })
                        ) : null
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default CurrentTeamsPanel;