import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { driversList } from '../../utils/currentInfo';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentDriverCards from './CurrentDriverCards';


const CurrentDriversPanel: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    return (
        <React.Fragment>
            <Section>  
                <Title darkMode={settings.isDarkMode}>2021 Drivers</Title>
                <Scroll>
                    { driversList.map(driver => 
                        <CurrentDriverCards 
                            driver={driver} 
                            key={driver.driverId} />
                        
                    )}
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default CurrentDriversPanel;