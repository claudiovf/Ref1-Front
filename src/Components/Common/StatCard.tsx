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
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';


const StatCardStyle = styled.div<{ dark: boolean, rad: string; darkMode: boolean; }>`
    ${props => props.darkMode 
        ? `background-color: ${props.dark ? "rgb(255,255,255, 0.2)" : "rgb(255,255,255, 0.1)"};`
        : `background-color: ${props.dark ? '#2F2F2F' : '#FFFFFF'};`}
    ${props => props.darkMode 
        ? `color: ${props.dark ? "rgb(255,255,255, 0.9)" : "rgb(255,255,255, 0.8)"};`
        : `color: ${props.dark ? '#FFFFFF' : '#2F2F2F'};`}
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
        background-color: ${props => props.darkMode ? "rgb(255,255,255, 0.1)" : "#FFF"};
        color: ${props => props.darkMode ? "rgb(255,255,255, 0.9)" : "#2F2F2F"};
    }
`;

const StatTitle = styled.div`
    text-align: left;
    font-family: "Work Sans Bold";
    font-size: 1rem;
    padding: 0.5rem 0.5rem;
`;

const StatValue = styled.div`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1.25rem;
`;
const StatValueRace = styled.div`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1rem;
`;
const StatValueDate = styled.div`
    font-family: "Work Sans Semi Bold";
    display: flex;
    display-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 0.75rem;
`;

const StatLabel = styled.div`
    font-family: "Work Sans Semi Bold";
    font-size: 0.75rem;
    color: rgb(255,255,255, 0.5);
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
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const handleOverlay = (bool: boolean) => setOverlay(bool);

    const getIcon = (stat: string) => {
        if (stat === 'wins') return <Flag size={28} />;
        else if (stat === 'podiums') return <Podium size={24} />;
        else if (stat === 'pointsFinish') return <TrendingUpOutline size={28} />;
        else return <Stop size={24} />;
    };


    return (
        <StatCardStyle dark={isDark(s.stat)} rad={rad} darkMode={settings.isDarkMode}>
            <InfoBox>
                <StatTitle>{s.stat === "pointsFinish" 
                    ? "Point Finishes" 
                    : s.stat === "dnfs" 
                        ? "DNFs"
                        : formattedPeriod(s.stat)}
                </StatTitle>
                <InfoRow>
                    <Icon>{getIcon(s.stat)}</Icon>
                    <InfoBoxLoc>
                        <StatValue>{s.total}</StatValue>
                        <StatLabel>{formattedPeriod(s.stat)}</StatLabel>
                    </InfoBoxLoc>
                </InfoRow>
                <InfoRow>
                <Icon><PercentOutline size={28} /></Icon>
                    <InfoBoxLoc>
                        <StatValue>{s.pct}</StatValue>
                        <StatLabel>{`${formattedPeriod(s.stat)}/Entries`}</StatLabel>
                    </InfoBoxLoc>
                </InfoRow>
                { s.total !== 0 
                ? <>
                <InfoRow>
                    <Icon><Calendar size={24} /></Icon>
                    <InfoBoxLoc>
                        <StatValueRace>{s.first.race}</StatValueRace>
                        <StatValueDate>{formattedDate(s.first.date)}</StatValueDate>
                        <StatLabel>First</StatLabel>
                    </InfoBoxLoc>
                </InfoRow>
                <InfoRow>
                    <Icon><Calendar size={24} /></Icon>
                    <InfoBoxLoc>
                        <StatValueRace>{s.last.race}</StatValueRace>
                        <StatValueDate>{formattedDate(s.last.date)}</StatValueDate>
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