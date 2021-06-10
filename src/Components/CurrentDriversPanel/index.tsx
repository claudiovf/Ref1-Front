import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { driversList } from '../../utils/currentInfo';
import { Section, Title, Scroll, H2 } from '../LayoutComponents';
import CurrentDriverCards from './CurrentDriverCards';

const CurrentDriversPanel: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    return (
        <React.Fragment>
            <Section>  
                <Title darkMode={settings.isDarkMode}><H2>2021 Drivers</H2></Title>
                <Scroll id="drivers-2021-scroll">
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