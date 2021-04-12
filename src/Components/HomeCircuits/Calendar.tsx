import { useQuery } from '@apollo/client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { GET_NEXT_RACES } from '../../queries';
import { CircuitType } from '../../types';
import Spinner from '../Common/Spinner';
import { Section, Scroll } from '../LayoutComponents';

const expanding = keyframes`
    0% { opacity: 0;}
    45% { opacity: 0; height: 30%; width: 30%}
    100% { opacity: 1}
`;

const RaceCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    color: black;
    border-radius: 0.5rem;
    height: auto;
    min-width: 70vw;
    margin: 0.25rem;
    animation-name: ${expanding};
    animation-duration: 0.5s;
`;

const TrackContainer = styled.div`
    min-height: 7rem;
    min-width: 7rem;
    background-color: #efefef;
`;

const RaceName = styled.div`
    font-family: "Work Sans Bold";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    margin: 1rem;
    color: #00c49a;
`;

const RaceLocation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: gray;
`;
const CircuitName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    margin: 1rem 0 0 0;
    color: #2f2f2f;
`;
const RaceDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans Semi Bold";
    font-size: 1rem;
    margin: 1rem;
    color: #2f2f2f;
`;

const getGP = (circuitId: string) => {
    switch(true) {
        case circuitId === 'bahrain':
            return 'Bahrain';
        case circuitId === 'imola':
            return 'Emilia Romagna';
        case circuitId === 'portimao':
            return 'Portuguese';
        case circuitId === 'catalunya':
            return 'Spanish';
        case circuitId === 'monaco':
            return 'Monaco';
        case circuitId === 'BAK':
            return 'Azerbaijan';
        case circuitId === 'villeneuve':
            return 'Canadian';
        case circuitId === 'ricard':
            return 'French';
        case circuitId === 'red_bull_ring':
            return 'Austrian';
        case circuitId === 'silverstone':
            return 'British';
        case circuitId === 'hungaroring':
            return 'Hungarian';
        case circuitId === 'spa':
            return 'Belgian';
        case circuitId === 'zandvoort':
            return 'Dutch';
        case circuitId === 'monza':
            return 'Italian';
        case circuitId === 'sochi':
            return 'Russian';
        case circuitId === 'marina_bay':
            return 'Singapore';
        case circuitId === 'suzuka':
            return 'Japanese';
        case circuitId === 'americas':
            return 'United States';
        case circuitId === 'rodriguez':
            return 'Mexican';
        case circuitId === 'interlagos':
            return 'Brazilian';
        case circuitId === 'albert_park':
            return 'Australian';
        case circuitId === 'jeddah':
            return 'Saudi Arabian';
        case circuitId === 'yas_marina':
            return 'Abu Dhabi';
    }
};

const Calendar: React.FC = () => {

    const { loading, data } = useQuery<{ findAllCircuits: CircuitType[] }>(GET_NEXT_RACES);

    if ( loading ) return <Spinner />;

    console.log(data);

    return (
            <Section>  
                <Scroll>
                    { data
                    ? data.findAllCircuits.map(race => {
                        const start = new Date(Date.parse(race.scheduleUTC.race) - 3600000);
                        return (
                            <RaceCard key={race.circuitId}>
                                <RaceName>
                                    {getGP(race.circuitId)} GP
                                </RaceName>
                                <TrackContainer></TrackContainer>
                                <CircuitName>
                                    {race.circuitName}
                                </CircuitName>
                                <RaceLocation>
                                    {race.location?.locality}, {race.location?.country}
                                </RaceLocation>
                                <RaceDate>
                                    { start.toDateString().substring(4, 10)}, { start.toLocaleTimeString().substring(0, 5)}
                                    
                                </RaceDate>
                            </RaceCard> 
                        );
                    })
                         : null 
                    }
                </Scroll>
            </Section> 
    );
};

export default Calendar;