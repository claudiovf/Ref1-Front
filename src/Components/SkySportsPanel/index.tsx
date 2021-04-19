import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentDriverCards from '../CurrentDriversPanel/CurrentDriverCards';
import { skyList } from '../../utils/currentInfo';


const SkySportsPanel: React.FC = () => {

    return (
        <React.Fragment>
            <Section>  
                <Title>Sky Sports Team</Title>
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