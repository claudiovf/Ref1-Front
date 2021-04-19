import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentDriverCards from '../CurrentDriversPanel/CurrentDriverCards';
import { legendsList } from '../../utils/currentInfo';


const LegendsPanel: React.FC = () => {

    return (
        <React.Fragment>
            <Section>  
                <Title>Legends</Title>
                <Scroll>
                    { legendsList.map(driver => 
                                <CurrentDriverCards 
                                    driver={driver} 
                                    key={driver.driverId} />
                    )}
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default LegendsPanel;