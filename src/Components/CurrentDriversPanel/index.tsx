import React from 'react';
import { driversList } from '../../utils/currentInfo';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentDriverCards from './CurrentDriverCards';


const CurrentDriversPanel: React.FC = () => {
        
    return (
        <React.Fragment>
            <Section>  
                <Title>2021 Drivers</Title>
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