import React from 'react';
import { Section, Title, Scroll } from '../LayoutComponents';
import CurrentDriverCards from '../CurrentDriversPanel/CurrentDriverCards';


const LegendsPanel: React.FC = () => {

    const legendsList = [
        {
            driverId: "michael_schumacher",
            givenName: "Michael",
            familyName: "Schumacher"
        },
        {
            driverId: "senna",
            givenName: "Ayrton",
            familyName: "Senna"
        },
        {
            driverId: "prost",
            givenName: "Alain",
            familyName: "Prost"
        },
        {
            driverId: "mansell",
            givenName: "Nigel",
            familyName: "Mansell"
        },
        {
            driverId: "jack_brabham",
            givenName: "Jack",
            familyName: "Brabham"
        },
        {
            driverId: "stewart",
            givenName: "Jackie",
            familyName: "Stewart"
        },
        {
            driverId: "lauda",
            givenName: "Niki",
            familyName: "Lauda"
        },
        {
            driverId: "moss",
            givenName: "Stirling",
            familyName: "Moss"
        },
        {
            driverId: "piquet",
            givenName: "Nelson",
            familyName: "Piquet"
        },
        {
            driverId: "fangio",
            givenName: "Juan",
            familyName: "Fangio"
        },
        {
            driverId: "clark",
            givenName: "Jim",
            familyName: "Clark"
        },
        {
            driverId: "emerson_fittipaldi",
            givenName: "Emerson",
            familyName: "Fittipaldi"
        },
    ];

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