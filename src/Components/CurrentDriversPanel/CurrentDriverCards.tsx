
import React from 'react';
import styled from 'styled-components';
import { Driver } from '../../types';
import { getDriverStyle } from '../../utils/currentInfo';
import { Cards, StyledLink } from '../LayoutComponents';


const CodeNumber = styled.div<{ color: string;}>`
    color: ${props => props.color};
    font-family: "Work Sans Bold";
    display: flex;
    flex-direction: row nowrap;
    padding: 0.5rem;
    font-size: 1.75rem;
    min-width: 7rem;
`;

const DriverName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 4rem;
    padding: 0.5rem;
    
`;

const First = styled.div<{ color: string }>`
    color: ${props => props.color};
    font-family: "Work Sans reg";
    font-size: 0.75rem;
`;

const Last = styled.div<{ color: string }>`
    color: ${props => props.color};
    font-family: "Work Sans Bold";
    font-size: 1rem;
`;

const Team = styled.div`
    color: #FFFFFF;
    font-family: "Work Sans Bold";
    font-size: 0.75rem;
    min-height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;


type DriverCard = Pick<Driver, "driverId" | "givenName" | "familyName" | "code" | "permanentNumber">;

const CurrentDriverCards: React.FC<{ driver: DriverCard }> = ({driver}: {driver: DriverCard}) => {
    const driverStyle = getDriverStyle(driver.driverId);


    return (
        <>
            <StyledLink to={"/profile/driver/" + driver.driverId}>
                <Cards  bg={driverStyle.primary}>
                    <CodeNumber color={driverStyle.secondary}>
                        {driver.code} {driver.permanentNumber}</CodeNumber>

                    <DriverName>
                        <First color={driverStyle.secondary}>
                            {driver.givenName}</First>

                        <Last color={driverStyle.secondary}>
                            {driver.familyName.toUpperCase()}</Last>

                    </DriverName>
                    <Team>
                        {driverStyle.team !== 'NA'
                            ? driverStyle.team
                            : null
                        }</Team>
                </Cards>
            </StyledLink>    
        </>
    );
};

export default CurrentDriverCards;