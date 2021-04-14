import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Schedule, DisplaySchedule } from '../../types';
import { SectionTitle, Section, SelectionButton } from '../LayoutComponents';
import { getLocalTimes, getTrackTimes } from '../../utils/formatting';

const ScheduleSection = styled(Section)`
        margin: 1rem 0 1rem 0;
        justify-content: center;
        align-items: center;
    
`;
const TitleRow = styled.div`
    padding: 0.75rem 1.25rem;
    display: flex;
    flex-direction: column;
`;

const ScheduleTitle = styled(SectionTitle)`
    padding: 0.25rem 0 0.5rem 0;
    vertical-align: bottom;
    text-align: center;
`;

const TimeSelection = styled.div`
    font-family: "Work Sans Semi Bold";
    color: #2f2f2f;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    font-size: 0.75rem;
`;

const ScheduleTable = styled.table`
    background-color: rgb(11, 49, 66, 0.04);
    width: 90vw;
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    border-radius: 0.5rem;
    @media (min-width: 768px) {
        max-width: 600px;
        min-width: 600px;
        margin: 0;
    }
`;

const Td = styled.td`
    height: 1rem;
    padding: 0.5rem 0;
    color: #2f2f2f;
    font-family: "Work Sans Semi Bold";
    font-size: 1rem;
`;

const Tr = styled.tr`
    ${Td}:nth-child(1) {
        text-align: left;
    }
    ${Td}:nth-child(2) {
        width: 33%;
    }
    ${Td}:nth-child(3) {
        width: 33%;
`;

interface Props {
    scheduleTrack: Schedule;
    scheduleUTC: Schedule;
}


const EventSchedule: React.FC<Props> = ({ scheduleTrack, scheduleUTC}: Props) => {
    const [timeSelected, setTimeSelected] = useState<string>("Your Time");
    const [displaySchedule, setDisplaySchedule] = useState<DisplaySchedule>(getLocalTimes(scheduleUTC));

    const localTime = getLocalTimes(scheduleUTC);
    const trackTime = getTrackTimes(scheduleTrack);

    useEffect(() => {
        if (timeSelected === "Your Time") {
            setDisplaySchedule(localTime);
        } else {
            setDisplaySchedule(trackTime);
        }
    }, [timeSelected]);




    return (
        <ScheduleSection>
            <TitleRow>
                <ScheduleTitle color={"#2f2f2f"}>Weekend Schedule</ScheduleTitle>
                <TimeSelection>
                {["Your Time", "Track Time"].map(option => option === timeSelected
                            ? <SelectionButton 
                                selected={true}
                                bg={"#00c49a"}
                                color={"#FFF"}
                                border={"rgb(255,255,255, 0)"}
                                key={option}>
                                    {option}
                            </SelectionButton> 
                            : <SelectionButton 
                                selected={false}
                                bg={"#fff"}
                                color={"#828282"}
                                border={"rgb(255,255,255, 0)"}
                                key={option}
                                onClick={() => setTimeSelected(option)}>
                                    {option}
                            </SelectionButton> 
                        )
                    } 
                </TimeSelection>
            </TitleRow>
            <ScheduleTable>
                <tbody>
                    <Tr>
                        <Td>Practice 1</Td>
                        <Td>{displaySchedule.practice_1.date}</Td>
                        <Td>{displaySchedule.practice_1.time}</Td>
                    </Tr>
                    <Tr>
                        <Td>Practice 2</Td>
                        <Td>{displaySchedule.practice_2.date}</Td>
                        <Td>{displaySchedule.practice_2.time}</Td>
                    </Tr>
                    <Tr>
                        <Td>Practice 3</Td>
                        <Td>{displaySchedule.practice_3.date}</Td>
                        <Td>{displaySchedule.practice_3.time}</Td>
                    </Tr>
                    <Tr>
                        <Td>Qualifying</Td>
                        <Td>{displaySchedule.qualifying.date}</Td>
                        <Td>{displaySchedule.qualifying.time}</Td>
                    </Tr>
                    <Tr>
                        <Td>Race</Td>
                        <Td>{displaySchedule.race.date}</Td>
                        <Td>{displaySchedule.race.time}</Td>
                    </Tr>
                </tbody>
            </ScheduleTable>
        </ScheduleSection>
    );
};

export default EventSchedule;