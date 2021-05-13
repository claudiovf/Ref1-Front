import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { GET_NEXT_RACES } from '../../queries';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { CircuitType } from '../../types';
import { getGP, getLocalTimes, convertToAmPm, getCountryCode } from '../../utils/formatting';
import Spinner from '../Common/Spinner';
import { Section, Scroll, SelectionButton, StyledLink } from '../LayoutComponents';

const expanding = keyframes`
    0% { opacity: 0;}
    50% { opacity: 0; }
    100% { opacity: 1}
`;

const RaceCard = styled.div<{ darkMode: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${props => props.darkMode ? "rgb(255, 255, 255, 0.15)" : "rgb(255,255,255, 0.95)"}; 
    color: black;
    border-radius: 0.5rem;
    height: auto;
    min-width: 70vw;
    margin: 0.5rem;
    padding-bottom: 1rem;
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
    color: #b2b2b2;
    margin: 0.25rem 0;
`;
const CircuitName = styled.div<{ darkMode: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: ${props => props.darkMode ? "rgb(255,255,255, 0.9)" : "#2f2f2f"};
    @media (min-width: 768px) {
        min-width: 14rem;
      }
`;
const RaceDate = styled.div<{ darkMode: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Work Sans Semi Bold";
    font-size: 1rem;
    margin: 1rem;
    color: ${props => props.darkMode ? "rgb(255,255,255, 0.9)" : "#2f2f2f"};
`;


const CalendarSection = styled(Section)`
    min-width: 100vw;
    @media (min-width: 768px) {
        width: auto;
        margin: 3rem 10% 3rem 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const Flag = styled.div`
`;


interface Props {
    nextCircuit: string;
}

const Calendar: React.FC<Props> = ({nextCircuit}: Props) => {
    const { loading, data } = useQuery<{ findAllCircuits: CircuitType[] }>(GET_NEXT_RACES,
        { 
            fetchPolicy: "cache-and-network"
        });
    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    
    const nextRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(nextRef && nextRef.current) {
            nextRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "end" });
        }
        
    }, [data, nextRef, nextCircuit]);


    if ( loading ) return <CalendarSection><Spinner /></CalendarSection>;

    const calendarList = [
        'bahrain',
        'imola',
        'portimao',
        'catalunya',
        'monaco',
        'BAK',
        'istanbul',
        'ricard',
        'red_bull_ring',
        'silverstone',
        'hungaroring',
        'spa',
        'zandvoort',
        'monza',
        'sochi',
        'marina_bay',
        'suzuka',
        'americas',
        'rodriguez',
        'interlagos',
        'albert_park',
        'jeddah',
        'yas_marina' 
    ];


    return (
        <React.Fragment>
            <CalendarSection>  
                <Scroll>
                    { data
                    ? calendarList.map(id => {
                        const race = data.findAllCircuits.find(race => race.circuitId === id);
                        
                        if (!race) return null;

                        const start = getLocalTimes(race.scheduleUTC);

                        return (
                            <React.Fragment key={race.circuitId}>
                                <StyledLink to={"/profile/circuit/" + race.circuitId}>
                                    <RaceCard 
                                        darkMode={settings.isDarkMode}
                                        ref ={race.circuitId === nextCircuit ? nextRef : null}
                                    >
                                        <RaceName>
                                            {getGP(race.circuitId)} GP
                                        </RaceName>
                                        <CircuitName darkMode={settings.isDarkMode}>
                                            {race.circuitName}
                                        </CircuitName>
                                        <RaceLocation>
                                            {race.location?.locality}, {race.location?.country}
                                        </RaceLocation>
                                        <Flag>
                                            <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(id)}.svg`} 
                                            alt={`${getGP(id)} flag`} width={"28"} height={"24"} />
                                        </Flag>
                                        <RaceDate darkMode={settings.isDarkMode}>
                                            { start.race.date}, {settings.timeFormat === '24hour' ? start.race.time : convertToAmPm(start.race.time)}
                                        </RaceDate>
                                        <SelectionButton 
                                            color={"#FFF"} 
                                            bg={"#00c49a"} 
                                            border={"#00c49a"} 
                                            selected={true}
                                        >
                                            View Event Info
                                        </SelectionButton>
                                    </RaceCard> 
                                </StyledLink>
                            </React.Fragment>
                        );
                    })
                         : null 
                    }
                </Scroll>
            </CalendarSection> 
        </React.Fragment>
    );
};

export default Calendar;