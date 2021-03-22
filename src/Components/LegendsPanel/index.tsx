import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import Spinner from '../Common/Spinner';
import CurrentDriverCards from '../CurrentDriversPanel/CurrentDriverCards';
import { useQuery } from '@apollo/client';
import { Driver } from '../../types';
import { GET_THIS_DRIVERS } from '../../queries';


const LegendsPanel: React.FC = () => {

    const driversList = [
        "michael_schumacher", "senna", "prost", 
        "mansell", "jack_brabham", "stewart", 
        "lauda", "moss", "piquet", 
        "fangio", "clark", "emerson_fittipaldi"
    ];

    const { loading, data } = useQuery<{ findManyDrivers: Driver[] }>(GET_THIS_DRIVERS,
        { variables: { driversList } });


    return (
        <React.Fragment>
            <Section>  
                <Title>Legends</Title>
                    { loading ? <Spinner /> : null}
                <Scroll>
                    { data ?  (
                        driversList.map(driver => {
                            const driverToDisplay = data.findManyDrivers.find(d => d.driverId === driver);

                            if(!driverToDisplay) return null;

                            return (
                                <CurrentDriverCards 
                                    driver={driverToDisplay} 
                                    key={driverToDisplay.driverId} />
                            );
                        })
                        ) : null
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default LegendsPanel;