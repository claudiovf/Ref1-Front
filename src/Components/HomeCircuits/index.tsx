import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { GET_NEXT_RACE } from '../../queries';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { CircuitType } from '../../types';
import { CircuitIds, getGP } from '../../utils/formatting';
import { SelectionButton, StyledButton, StyledLink } from '../LayoutComponents';
const Calendar = lazy(() => import('./Calendar'));
import CountDown from './CountDown';

const slowAppearAnimation = keyframes`
    0% { opacity: 0; transform: scale(0.8, 0.8) ;}
    20% { opacity: 0;}
    100% { opacity: 1;}
`;


const CircuitsContainer = styled.div<{ exp: boolean; darkMode: boolean;}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${props => props.darkMode ? "#2f2f2f" : "#0b3142" };
    scroll-margin-top: 4.25rem;
    width: auto;
    min-height: 18rem;
    margin: ${ props => props.exp ? "0" : "1.25rem"};
    padding: ${ props => props.exp ? "0.75rem 0" : "0.5rem 0"};
    border-radius: ${ props => props.exp ? "0" : "0.5rem"};
    margin-bottom: 0;
    transform-origin: top;
    transition: all 0.5s ease-in-out;
    animation-name: ${slowAppearAnimation};
    animation-duration: 0.5s;
    @media (min-width: 768px) {
        width: ${ props => props.exp ? "auto" : "600px"};
      }
`;

const NextTitle = styled.div`
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: white;
    width: auto;
    margin: 0.25rem;
`;

const ExpandButton = styled(StyledButton)`
    background-color: rgb(0,0,0,0);
    color: white;
    font-size: 0.75rem;
    border: 1px solid white;
    padding: 0.75rem 1rem;
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
    const [nextRace, setNextRace] = useState<CircuitType | null>(null);
    const [expanded, setExpanded ] = useState<boolean>(false);
    const [timeUp, setTimeUp ] = useState<boolean>(false);

    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    
    const topRef = useRef<HTMLDivElement | null>(null);

    //next race and race after to be display when countdown time is up. to be automated
    const nextCircuit = "red_bull_ring1";
    const circuitAfter = "red_bull_ring2";
    
    const { loading, data } = useQuery<{ findCircuit: CircuitType }>(GET_NEXT_RACE, { 
        fetchPolicy: "cache-and-network", 
        variables: { circuitId: !timeUp ? nextCircuit : circuitAfter} 
    });

    
    useEffect(() => {
        if (data) {
            if (Date.parse(data.findCircuit.scheduleUTC.race) > Date.parse(new Date().toUTCString())) {
                setNextRace(data.findCircuit);
            } else {
                setTimeUp(true);
            }
        }
    }, [data, timeUp]);
    


    const handleTimeUp = (bool: boolean) => {
        setTimeUp(bool);
    };

    const handleExpand = (expanded: boolean) => {
        setExpanded(!expanded);
        if(topRef && topRef.current) {
            topRef.current.scrollIntoView({ block: "start", behavior: "smooth", inline: "center" });
        }
    };



    return (
        <React.Fragment>
            <CircuitsContainer id="circuits-container" exp={expanded} darkMode={settings.isDarkMode} ref={topRef}>
                {
                    loading || !data || !nextRace || !nextRace.location
                    ? <></>
                    :<>
                        <NextTitle>Up Next: 
                            <StyledLink to={"/profile/circuit/" + nextRace.circuitId}>
                                <SelectionButton 
                                    selected={true}
                                    bg={"#00c49a"}
                                    color={"#FFF"}
                                    border={"rgb(255,255,255, 0)"}
                                    >
                                        {getGP(nextRace.circuitId as CircuitIds).gpName} GP
                                </SelectionButton> 
                            </StyledLink>
                        </NextTitle>
                        
                        <CountDown 
                            nextRaceDates={nextRace.scheduleUTC} 
                            handleTimeUp={handleTimeUp}
                            nextRaceLoc={nextRace.location} 
                        />
                        
                        <Suspense fallback={<></>}>
                            {
                                expanded
                                ? <Calendar nextCircuit={!timeUp ? nextCircuit : circuitAfter} />
                                : null
                            }
                        </Suspense>
                        
                        <ExpandButton onClick={() => handleExpand(expanded)}>
                            { !expanded ? "2021 Calendar" : "Collapse"}
                        </ExpandButton>
                    </>
                }
            </CircuitsContainer>
            
        </React.Fragment>
    );
};

export default HomeCircuits;