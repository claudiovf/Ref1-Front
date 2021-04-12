import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    margin: 0.5rem 0; 
    width: 80%;
    height: auto;
`;

const Th = styled.th`
    font-family: "Work Sans Bold";
    color: white;
    font-size: 1.5rem;
    padding: 0 0.75rem;
    width: 25%;
`;

const Td = styled.td`
    font-family: "Work Sans Semi Bold";
    color: white;
    font-size: 0.75rem;
    padding: 0 0.75rem;
`;


const handleCountdown = (UTCdate: string) => {
    let diff = (Date.parse(UTCdate) - Date.parse(new Date().toUTCString())) / 1000;
    const countDown = {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0
    };

    diff = diff - 3600; // daylight saving time. ends on 31/10/2021

    if(diff >= 86400) {
        const dayTotal = Math.floor( diff / 86400 );
        countDown.days = dayTotal;
        diff = diff - dayTotal * 86400;
    }

    if(diff >= 3600) {
        const hourTotal = Math.floor( diff / 3600 );
        countDown.hours = hourTotal;
        diff = diff - hourTotal * 3600;
    }

    if(diff >= 60) {
        const minTotal = Math.floor( diff / 60 );
        countDown.mins = minTotal;
        diff = diff - minTotal * 60;
    }
    countDown.secs = diff;

    return countDown;
};


interface Props {
    nextRaceDate: string;
}

const CountDown: React.FC<Props> = ({nextRaceDate}: Props) => {
    const [days, setDays ] = useState<number>(0);
    const [hours, setHours ] = useState<number>(0);
    const [mins, setMins ] = useState<number>(0);
    const [secs, setSecs ] = useState<number>(0);

    useEffect(() => {
        setInterval(() => {
            const countDown = handleCountdown(nextRaceDate);
            setDays(countDown.days);
            setHours(countDown.hours);
            setMins(countDown.mins);
            setSecs(countDown.secs);
        });
    });
    
    

    return (
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
    );
};

export default CountDown;