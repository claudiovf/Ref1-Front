import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentDriverCards from '../CurrentDriversPanel/CurrentDriverCards';
import { skyList } from '../../utils/currentInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';


const SkySportsPanel: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    return (
        <React.Fragment>
            <Section>  
                <Title darkMode={settings.isDarkMode}>Sky Sports Team</Title>
                <Scroll>
                    { skyList.map(driver => 
                                <CurrentDriverCards 
                                    driver={driver} 
                                    key={driver.driverId} />
                    )}
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default SkySportsPanel;