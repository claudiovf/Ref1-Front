import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleCountdown } from '../../utils/formatting';

const Table = styled.table`
    margin: 0.5rem 0; 
    width: 80%;
    height: auto;
    @media (min-width: 768px) {
        max-width: 24rem;
      }
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