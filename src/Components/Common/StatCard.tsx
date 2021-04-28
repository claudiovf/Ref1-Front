import React, { useState } from 'react';
import styled from 'styled-components';
import { Stat } from '../../types';
import { InfoRow, InfoBox, Icon } from '../LayoutComponents';
import { formattedDate, formattedPeriod, isDark } from '../../utils/formatting';
import NextSearchOverlay from './NextSearchOverlay';
import { Flag } from '@styled-icons/remix-line';
import { TrendingUpOutline, PercentOutline } from '@styled-icons/evaicons-outline';
import { Podium } from '@styled-icons/ionicons-outline';
import { Stop } from '@styled-icons/octicons';
import { Calendar } from '@styled-icons/zondicons';


const StatCardStyle = styled.div<{ dark: boolean, rad: string }>`
    background-color: ${props => props.dark ? '#2F2F2F' : '#FFFFFF'};
    color: ${props => props.dark ? '#FFFFFF' : '#2F2F2F'};
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem 0;
    border-radius: ${props => props.rad};
    position: relative;

    @media (min-width: 768px) {
        width: 48%;
        border-radius: 0.5rem;
        margin-bottom: 4%;
        background-color: #FFFFFF;
        color: #2F2F2F;
    }
`;

const StatTitle = styled.div<{ colorTitle: boolean }>`
    text-align: left;
    color: ${props => props.colorTitle ? "#2F2F2F" : "#FFFFFF" };
    font-family: "Work Sans Bold";
    font-size: 1rem;
    padding: 0.5rem 0.5rem;
    @media (min-width: 768px) {
        color: #2F2F2F;
    }
`;

const StatValue = styled.div<{ colorDark: boolean }>`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1.25rem;
    color: ${props => props.colorDark ? "#2F2F2F" : "#FFFFFF" };
    @media (min-width: 768px) {
        color: #2F2F2F;
    }
`;
const StatValueRace = styled.div<{ colorDark: boolean }>`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1rem;
    color: ${props => props.colorDark ? "#2F2F2F" : "#FFFFFF" };
    @media (min-width: 768px) {
        color: #2F2F2F;
    }
`;
const StatValueDate = styled.div<{ colorDark: boolean }>`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 0.75rem;
    color: ${props => props.colorDark ? "#2F2F2F" : "#FFFFFF" };
    @media (min-width: 768px) {
        color: #2F2F2F;
    }
`;

const StatLabel = styled.div`
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: rgb(150, 150, 150, 0.5)
`;

export const InfoBoxLoc = styled(InfoBox)`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    padding: 0.5rem 1rem 0.25rem 1rem;
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

    const getIcon = (stat: string) => {
        if (stat === 'wins') return <Flag size={28} />;
        else if (stat === 'podiums') return <Podium size={24} />;
        else if (stat === 'pointsFinish') return <TrendingUpOutline size={28} />;
        else return <Stop size={24} />;
    };


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
                    <Icon>{getIcon(s.stat)}</Icon>
                    <InfoBoxLoc>
                        <StatValue colorDark={!isDark(s.stat)}>{s.total}</StatValue>
                        <StatLabel>{formattedPeriod(s.stat)}</StatLabel>
                    </InfoBoxLoc>
                </InfoRow>
                <InfoRow>
                <Icon><PercentOutline size={28} /></Icon>
                    <InfoBoxLoc>
                        <StatValue colorDark={!isDark(s.stat)}>{s.pct}</StatValue>
                        <StatLabel>{`${formattedPeriod(s.stat)}/Entries`}</StatLabel>
                    </InfoBoxLoc>
                </InfoRow>
                { s.total !== 0 
                ? <>
                <InfoRow>
                    <Icon><Calendar size={24} /></Icon>
                    <InfoBoxLoc>
                        <StatValueRace colorDark={!isDark(s.stat)}>{s.first.race}</StatValueRace>
                        <StatValueDate colorDark={!isDark(s.stat)}>{formattedDate(s.first.date)}</StatValueDate>
                        <StatLabel>First</StatLabel>
                    </InfoBoxLoc>
                </InfoRow>
                <InfoRow>
                    <Icon><Calendar size={24} /></Icon>
                    <InfoBoxLoc>
                        <StatValueRace colorDark={!isDark(s.stat)}>{s.last.race}</StatValueRace>
                        <StatValueDate colorDark={!isDark(s.stat)}>{formattedDate(s.last.date)}</StatValueDate>
                        <StatLabel>Last</StatLabel>
                    </InfoBoxLoc>
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