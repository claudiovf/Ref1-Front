import React, { useState } from 'react';
import styled from 'styled-components';
import { Stat } from '../../types';
import { InfoRow, InfoBox, Icon } from '../LayoutComponents';
import { formattedDate, formattedPeriod, isDark } from '../../utils/formatting';
import NextSearchOverlay from './NextSearchOverlay';


const StatCardStyle = styled.div<{ dark: boolean, rad: string }>`
    background-color: ${props => props.dark ? '#2F2F2F' : '#FFFFFF'};
    color: ${props => props.dark ? '#FFFFFF' : '#2F2F2F'};
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem 0;
    border-radius: ${props => props.rad};
    position: relative;
`;

const StatTitle = styled.div<{ colorTitle: boolean }>`
    text-align: left;
    color: ${props => props.colorTitle ? "#2F2F2F" : "#FFFFFF" };
    font-family: "Work Sans Bold";
    font-size: 1rem;
    padding: 0.5rem 0.5rem;
`;

const StatValue = styled.div<{ colorDark: boolean }>`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1.25rem;
    color: ${props => props.colorDark ? "#2F2F2F" : "#FFFFFF" };
`;
const StatValueRace = styled.div<{ colorDark: boolean }>`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1rem;
    color: ${props => props.colorDark ? "#2F2F2F" : "#FFFFFF" };
`;
const StatValueDate = styled.div<{ colorDark: boolean }>`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 0.75rem;
    color: ${props => props.colorDark ? "#2F2F2F" : "#FFFFFF" };
`;

const StatLabel = styled.div`
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: rgb(150, 150, 150, 0.5)
`;



interface Props {
    s: Stat; 
    rad: string; 
    period: string;
    type: string;
}

const StatCard: React.FC<Props> = ({s, rad, period, type}: Props) => {
    const [ overlay, setOverlay ] = useState<boolean>(false);

    const handleOverlay = (bool: boolean) => setOverlay(bool);


    return (
        <StatCardStyle dark={isDark(s.stat)} rad={rad}>
            <InfoBox>
                <StatTitle colorTitle={!isDark(s.stat)}>{s.stat === "pointsFinish" 
                    ? "Point Finishes" 
                    : s.stat === "dnfs" 
                        ? "DNFs"
                        : formattedPeriod(s.stat)}
                </StatTitle>
                <InfoRow>
                    <Icon>&#10066;</Icon>
                    <InfoBox>
                        <StatValue colorDark={!isDark(s.stat)}>{s.total}</StatValue>
                        <StatLabel>{formattedPeriod(s.stat)}</StatLabel>
                    </InfoBox>
                </InfoRow>
                <InfoRow>
                <Icon>&#10066;</Icon>
                    <InfoBox>
                        <StatValue colorDark={!isDark(s.stat)}>{s.pct}</StatValue>
                        <StatLabel>{`${formattedPeriod(s.stat)}/Entries`}</StatLabel>
                    </InfoBox>
                </InfoRow>
                { s.total !== 0 
                ? <>
                <InfoRow>
                    <Icon>&#10066;</Icon>
                    <InfoBox>
                        <StatValueRace colorDark={!isDark(s.stat)}>{s.first.race}</StatValueRace>
                        <StatValueDate colorDark={!isDark(s.stat)}>{formattedDate(s.first.date)}</StatValueDate>
                        <StatLabel>First</StatLabel>
                    </InfoBox>
                </InfoRow>
                <InfoRow>
                    <Icon>&#10066;</Icon>
                    <InfoBox>
                        <StatValueRace colorDark={!isDark(s.stat)}>{s.last.race}</StatValueRace>
                        <StatValueDate colorDark={!isDark(s.stat)}>{formattedDate(s.last.date)}</StatValueDate>
                        <StatLabel>Last</StatLabel>
                    </InfoBox>
                </InfoRow>
                </>
                : null }
            </InfoBox>
            <NextSearchOverlay 
                    stats={[s.stat]}
                    rad={rad}
                    period={period}
                    type={type}
                    overlay={overlay}
                    handleOverlay={handleOverlay}
                    />
        </StatCardStyle>
    );
};

export default StatCard;