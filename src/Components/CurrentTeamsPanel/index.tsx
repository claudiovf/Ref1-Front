import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentTeamCards from './CurrentTeamCards';


const CurrentTeamsPanel: React.FC = () => {
    const teamsList = [
        'mercedes', 'red_bull', 'mclaren', 'aston_martin', 
        'alpine', 'ferrari', 'alphatauri', 'alfa', 
        'haas', 'williams'
    ];

    return (
        <React.Fragment>
            <Section>  
                <Title>2021 Teams</Title>
                <Scroll>
                    { teamsList.map(team => {
                            return (
                                <CurrentTeamCards 
                                    team={team} 
                                    key={team} />
                            );
                        })
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default CurrentTeamsPanel;