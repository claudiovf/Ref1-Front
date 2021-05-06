import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { Schedule, Location } from '../../types';
import { handleCountdown, getSessionInfo, getLocalDateWith, convertToAmPm } from '../../utils/formatting';
import SessionSelection from './SessionSelection';
import Weather from './Weather';

const Table = styled.table`
    margin: 0.25rem 0 0.75rem 0; 
    width: 80%;
    height: auto;
    @media (min-width: 768px) {
        max-width: 24rem;
      }
`;

const Th = styled.th`
    font-family: "Work Sans Bold";
    color: #00c49a;
    font-size: 1.75rem;
    padding: 0 0.75rem;
    width: 25%;
`;

const Td = styled.td`
    font-family: "Work Sans Semi Bold";
    color: white;
    font-size: 0.75rem;
    padding: 0 0.75rem;
`;

const StartDisplay = styled.div`
      width: 100%;
      font-family: "Work Sans Bold";
      font-size: 0.75rem;
      padding: 0.25rem 0;
      color: rgb(255,255,255, 0.8);
`;


interface Props {
    nextRaceDates: Schedule;
    handleTimeUp: (bool: boolean) => void;
    nextRaceLoc: Location;
}

const CountDown: React.FC<Props> = ({nextRaceDates, handleTimeUp, nextRaceLoc}: Props) => {
    const [sessionSelected, setSessionSelected] = useState<string>(localStorage.getItem('countdownSession') || "race");
    const [sessionsOver, setSessionsOver] = useState<string[]>([]);
    const [start, setStart] = useState<string>(getSessionInfo(nextRaceDates, sessionSelected));

    const [days, setDays ] = useState<number>(0);
    const [hours, setHours ] = useState<number>(0);
    const [mins, setMins ] = useState<number>(0);
    const [secs, setSecs ] = useState<number>(0);

    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    

    useEffect(() => {
        const zeroedSessions: string[] = [];

        const interval = setInterval(() => {
            
            
            ["FP1", "FP2", "FP3", "qualifying", "race"].map(session => {
                //const sessionCountdown = handleCountdown(getSessionInfo(nextRaceDates.practice_1 === "2021-05-20T10:30:00.000Z" ? nextRaceDates : test, session));
                const sessionCountdown = handleCountdown(getSessionInfo(nextRaceDates, session));
                if(session === sessionSelected) {
                    setDays(sessionCountdown.days);
                    setHours(sessionCountdown.hours);
                    setMins(sessionCountdown.mins);
                    setSecs(sessionCountdown.secs);
                }
                if (sessionCountdown.days < 1
                    && sessionCountdown.hours < 1
                    && sessionCountdown.mins < 1
                    && sessionCountdown.secs < 1) {
                        if(session === "race") {
                            handleTimeUp(true);
                            zeroedSessions.push(session);
                            localStorage.removeItem('countdownSession');
                        }
                        else {
                            zeroedSessions.push(session);
                            if(localStorage.getItem('countdownSession') === session ) {
                                localStorage.removeItem('countdownSession');
                            }

                            if(session === sessionSelected) {
                                setSessionSelected("race");
                                setStart(getSessionInfo(nextRaceDates, "race"));
                            }
                        }
                    }
            });
        });
        if(zeroedSessions.includes("race")) {
            setSessionsOver([]);

        } else {
            setSessionsOver(zeroedSessions);
        }


        return () => clearInterval(interval);

    }, [nextRaceDates, sessionSelected]);
    

    const handleSessionSelection = (session: string) => {
        setSessionSelected(session);
        setStart(getSessionInfo(nextRaceDates, session));

        if (localStorage.getItem('countdownSession') ) {
            localStorage.removeItem('countdownSession');
        }
        localStorage.setItem('countdownSession', session);
    };

    return (
        <React.Fragment>
            <SessionSelection 
                handleSessionSelection={handleSessionSelection}
                sessionSelected={sessionSelected}
                sessionsOver={sessionsOver}
            />
            <StartDisplay>
                {getLocalDateWith(start).date}, 
                &nbsp;{settings.timeFormat === '24hour' ? getLocalDateWith(start).time : convertToAmPm(getLocalDateWith(start).time)}
            </StartDisplay>
            <Table>
                <tbody>
                    <tr>
                        <Th>{days.toString().padStart(2, "0")}</Th>
                        <Th>{hours.toString().padStart(2, "0")}</Th>
                        <Th>{mins.toString().padStart(2, "0")}</Th>
                        <Th>{secs.toString().padStart(2, "0")}</Th>
                    </tr>
                    <tr>
                        <Td>Days</Td>
                        <Td>hours</Td>
                        <Td>Mins</Td>
                        <Td>Secs</Td>
                    </tr>
                </tbody>
            </Table>
            <Weather 
                    nextRaceLoc={nextRaceLoc} 
                    raceTime={nextRaceDates}
                    sessionSelected={sessionSelected}
                />
        </React.Fragment>
    );
};

export default CountDown;