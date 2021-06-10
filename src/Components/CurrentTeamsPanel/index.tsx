import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { Section, Title, Scroll, H2 } from '../LayoutComponents';
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
                <Title darkMode={settings.isDarkMode}><H2>2021 Teams</H2></Title>
                <Scroll id="teams-2021-scroll">
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