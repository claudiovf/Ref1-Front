import { useQuery } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GET_PREVIOUS_EVENTS } from '../../../queries';
import { RootState } from '../../../store';
import { SettingsState } from '../../../store/SettingsStore/settingsTypes';
import { CircuitEvent } from '../../../types';
import { SectionTitle, Section, Scroll, SelectionButton } from '../../LayoutComponents';
import EventResult from './EventResult';
import EventSummary from './EventSummary';

const Container = styled.div`
    width: 100%;
    height: auto;
    //background-color: tomato;
`;

const ResultsWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    //background-color:teal;
    width: auto;
    height: auto;
    max-width: 100vw;
    margin: 1.25rem 0;
`;

const SectionCircuit = styled(Section)`
    @media (min-width: 768px) {
        margin:0;
        max-width: 80%;
    }
`;


const Title = styled(SectionTitle)<{ darkMode: boolean }>`
    color: ${props => props.darkMode ? "rgb(255,255,255,0.9)" : "#2f2f2f" }; 
    padding: 0.25rem 0 1rem 0;
    vertical-align: bottom;
    text-align: left;
    font-size: 1.25rem;
`;
const NoPrev = styled(SectionTitle)`
    font-family: "Work Sans Reg";
    padding: 0.5rem 0 0.5rem 0;
    vertical-align: bottom;
    text-align: left;
    font-size: 1rem;
`;



interface Props {
    circuitId: string;
}

const PreviousResults: React.FC<Props> = ({circuitId}: Props) => {
    const [ allEvents, setAllEvents ] = useState<CircuitEvent[] | null>(null);
    const [ prevSelected, setPrevSelected ] = useState<string | null>(null);
    const [ displayEvent, setDisplayEvent ] = useState<CircuitEvent | null>(null);

    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const { data } = useQuery<{ getPreviousEvents: CircuitEvent[] }>(GET_PREVIOUS_EVENTS, {
        fetchPolicy: "cache-and-network", 
        variables: { circuitId } 
    });
    
    useEffect(() => {
        if (data && data.getPreviousEvents.length > 0) {
            setAllEvents(data.getPreviousEvents);
            if (!prevSelected) {
                setPrevSelected(data.getPreviousEvents[0].date);
                setDisplayEvent(data.getPreviousEvents[0]);
            } else {
                const selection = allEvents?.find(event => event.date === prevSelected);
                if (selection) {
                    setDisplayEvent(selection);
                }
            }
        }
    }, [data, prevSelected]);

    if (data?.getPreviousEvents.length === 0) {
        return (
            <Container>
                <ResultsWrap>
                    <Title color={"#2f2f2f"} darkMode={settings.isDarkMode}>Previous Results</Title>
                    <NoPrev color={"#2f2f2f"}>No previous events at this location.</NoPrev>
                </ResultsWrap>
            </Container>
        );
    }

    if (!data || !allEvents) return null;
    


    return (
        <React.Fragment>
            <Container>
                <ResultsWrap>
                    <Title color={"#2f2f2f"} darkMode={settings.isDarkMode} >Previous Results</Title>
                    <SectionCircuit>
                        <Scroll>
                            {
                                allEvents.map(race => 
                                    race.date === prevSelected
                                    ? <SelectionButton
                                        key={race.date}
                                        bg={"#00c49a"}
                                        color={"#FFF"}
                                        border={"rgb(255,255,255, 0)"}
                                        selected={true}
                                        >
                                        {race.season}
                                    </SelectionButton>
                                    : <SelectionButton
                                        key={race.date}
                                        color={"#a2a2a2"}
                                        bg={"rgb(0,0,0,0)"}
                                        border={"rgb(0,0,0,0)"}
                                        selected={false}
                                        onClick={() => setPrevSelected(race.date)}
                                        >
                                        {race.season}
                                    </SelectionButton>
                                )
                            }
                        </Scroll>
                    </SectionCircuit>
                    {
                        displayEvent
                        ? <>
                            <EventSummary displayEvent={displayEvent} /> 
                            <EventResult displayEvent={displayEvent} /> 
                        </>
                        : null
                    }
                </ResultsWrap>
            </Container>
        </React.Fragment>
    );
};

export default PreviousResults;