import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentTeamCards from './CurrentTeamCards';


const CurrentTeamsPanel: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    const teamsList = [
        'mercedes', 'red_bull', 'mclaren', 'aston_martin', 
        'alpine', 'ferrari', 'alphatauri', 'alfa', 
        'haas', 'williams'
    ];

    return (
        <React.Fragment>
            <Section>  
                <Title darkMode={settings.isDarkMode}>2021 Teams</Title>
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