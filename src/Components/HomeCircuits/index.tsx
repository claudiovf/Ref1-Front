import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { GET_NEXT_RACE } from '../../queries';
import { CircuitType } from '../../types';
import { StyledButton } from '../LayoutComponents';
import Calendar from './Calendar';
import CountDown from './CountDown';
import Weather from './Weather';


const CircuitsContainer = styled.div<{ exp: boolean; }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #0b3142;
    width: auto;
    min-height: auto;
    margin: ${ props => props.exp ? "0" : "1.25rem"};
    padding: ${ props => props.exp ? "0.5rem 0" : "0"};
    border-radius: ${ props => props.exp ? "0" : "0.5rem"};
    margin-bottom: 0;
    transition: all 0.5s ease-in-out;
    @media (min-width: 768px) {
        width: 80%;
        margin: 3rem 5% 3rem 10%;
      }
`;

const NextTitle = styled.div`
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: white;
    width: auto;
    margin: 0.25rem;
`;
const NextCountry = styled.span`
    font-family: "Work Sans Bold";
    font-size: 1.25rem;
    color: #00c49a;
`;

const ExpandButton = styled(StyledButton)`
    background-color: rgb(0,0,0,0);
    color: white;
    font-size: 0.75rem;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    font-family: "Work Sans Semi Bold";
    margin: 0.25rem 0 0.5rem 0;
    white-space: nowrap;
    border-radius: 2rem;
    scroll-snap-align: center;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.1);
        }
    }
`;

const HomeCircuits: React.FC = () => {
    const [expanded, setExpanded ] = useState<boolean>(false);
    const nextCircuit = "imola";

    const { loading, data } = useQuery<{ findCircuit: CircuitType }>(GET_NEXT_RACE,
        { variables: { circuitId: nextCircuit} });


    if ( loading || !data ) return null;

    const nextRace = data.findCircuit;
    if (!nextRace || !nextRace.location) return null;
    

    return (
        <React.Fragment>

            <CircuitsContainer exp={expanded}>
                <NextTitle>Up Next: <NextCountry>{nextRace.location.locality}, {nextRace.location.country}</NextCountry></NextTitle>
                <CountDown nextRaceDate={nextRace.scheduleUTC.race} />
                <Weather nextRaceLoc={nextRace.location} />
                
                {
                    expanded
                    ? <Calendar nextCircuit={nextCircuit} />
                    : null
                }
                
                <ExpandButton onClick={() => setExpanded(!expanded)}>
                    { !expanded ? "2021 Calendar" : "Collapse"}
                </ExpandButton>
            </CircuitsContainer>
            
        </React.Fragment>
    );
};

export default HomeCircuits;