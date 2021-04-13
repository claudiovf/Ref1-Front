import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { GET_NEXT_RACES } from '../../queries';
import { CircuitType } from '../../types';
import { getGP } from '../../utils/formatting';
import Spinner from '../Common/Spinner';
import { Section, Scroll } from '../LayoutComponents';

const expanding = keyframes`
    0% { opacity: 0;}
    50% { opacity: 0; }
    100% { opacity: 1}
`;

const RaceCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fefefe;
    color: black;
    border-radius: 0.5rem;
    height: auto;
    min-width: 70vw;
    margin: 0.25rem;
    animation-name: ${expanding};
    animation-duration: 0.5s;

    @media (min-width: 768px) {
        flex-grow: 1;
        min-width: 16rem;
        
        &:hover {
            transform: scale(1.02);
          }
      }
`;

// const TrackContainer = styled.div`
//     min-height: 7rem;
//     min-width: 7rem;
//     background-color: #efefef;
// `;

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
    color: #2f2f2f;
    @media (min-width: 768px) {
        min-width: 14rem;
      }
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


const CalendarSection = styled(Section)`
width: 100vw;
    @media (min-width: 768px) {
        width: auto;
        margin: 3rem 10% 3rem 10%;
    }
`;


interface Props {
    nextCircuit: string;
}

const Calendar: React.FC<Props> = ({nextCircuit}: Props) => {

    const { loading, data } = useQuery<{ findAllCircuits: CircuitType[] }>(GET_NEXT_RACES);

    
    const nextRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(nextRef && nextRef.current) {
            nextRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "end" });
        }
        
    }, [nextRef]);
    
    if ( loading ) return <Spinner />;

    return (
            <CalendarSection>  
                <Scroll>
                    { data
                    ? data.findAllCircuits.map(race => {
                        const start = new Date(Date.parse(race.scheduleUTC.race) - 3600000);
                        return (
                            <RaceCard 
                                ref ={race.circuitId === nextCircuit ? nextRef : null}
                                key={race.circuitId}
                            >
                                <RaceName>
                                    {getGP(race.circuitId)} GP
                                </RaceName>
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
            </CalendarSection> 
    );
};

export default Calendar;