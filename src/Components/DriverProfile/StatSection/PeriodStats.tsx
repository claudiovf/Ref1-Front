import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, DriverPeriod } from '../../../types';
import { formattedDate } from '../../../utils/formatting';
import NextSearchOverlay from '../../Common/NextSearchOverlay';
import { InfoRow, InfoBox, Value, Label, Icon, SectionTitle } from '../../LayoutComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SettingsState } from '../../../store/SettingsStore/settingsTypes';
import Icons from '../../Icons/Icons';


const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding-top: 1rem;

    @media (min-width: 768px) {
        padding-left: 2.5rem;
    }
`;


const DarkValue = styled(Value)`
    font-size: 1.25rem;
`;

const DarkLabel = styled(Label)`
    font-size: 0.75rem;
`;

const RaceValue = styled(Value)`
    font-size: 1rem;
`;
const DateValue = styled(Value)`
    font-size: 0.75rem;
`;

const CenterInfoBox = styled(InfoBox)`
    min-width: 5rem;
`;

const InfoRowWithBorder = styled(InfoRow)`
    border-bottom: 1px solid #DDDDDD;
`;

const TopStats = styled.div<{darkMode: boolean}>`
    background-color: ${props => props.darkMode ? "rgb(255,255,255,0.1)" : "#FFF"};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0rem 1.5rem 1.5rem 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;

    ${DarkValue}, ${DateValue}, ${RaceValue} {
        color: ${props => props.darkMode ? "rgb(255,255,255, 0.9)" : "#2F2F2F" };
    }
    ${DarkLabel} {
        color: ${props => props.darkMode ? "rgb(255,255,255, 0.5)" : "#a2a2a2" };
    }
    ${InfoRowWithBorder} {
        border-bottom: ${props => props.darkMode ? "1px solid rgb(255,255,255, 0.25)" : "1px solid #DDDDDD" };
    }
    
`;



interface Props {
    displayPeriod: DriverPeriod;
    driverStyle: CurrTeamStyles;
}
const PeriodStats: React.FC<Props> = ({ displayPeriod, driverStyle }: Props) => {
    const [ overlay, setOverlay ] = useState<boolean>(false);
    
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const handleOverlay = (bool: boolean) => setOverlay(bool);

   
    return (
        <React.Fragment>
            <StatsContainer>
                <SectionTitle color={driverStyle.secondary}>Summary</SectionTitle>
                <TopStats darkMode={settings.isDarkMode}>
                        <InfoRowWithBorder>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.entries}</DarkValue>
                                <DarkLabel>Entries</DarkLabel>
                            </CenterInfoBox>
                            { displayPeriod.championshipRank > 0 
                            ? <CenterInfoBox>
                                <DarkValue>{displayPeriod.championshipRank}</DarkValue>
                                <DarkLabel>Season Rank</DarkLabel>
                            </CenterInfoBox>
                            : null}
                        </InfoRowWithBorder>
                        <InfoRowWithBorder>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.points}</DarkValue>
                                <DarkLabel>Points</DarkLabel>
                            </CenterInfoBox>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.avgPoints}</DarkValue>
                                <DarkLabel>Average Points</DarkLabel>
                            </CenterInfoBox>
                        </InfoRowWithBorder>
                        <InfoRowWithBorder>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.bestResult}</DarkValue>
                                <DarkLabel>Best Result</DarkLabel>
                            </CenterInfoBox>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.avgPosition}</DarkValue>
                                <DarkLabel>Average Result</DarkLabel>
                            </CenterInfoBox>
                        </InfoRowWithBorder>
                        <InfoRow>
                            <Icon>
                                <Icons 
                                    color={"#b4bebf"} 
                                    size={"24"}
                                    iconType={"Calendar"}
                                />
                            </Icon>
                            <CenterInfoBox>
                                <RaceValue>{displayPeriod.firstEntry.race}</RaceValue>
                                <DateValue>{formattedDate(displayPeriod.firstEntry.date)}</DateValue>
                                <DarkLabel>First</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>
                        <InfoRow>
                            <Icon>
                                <Icons 
                                    color={"#b4bebf"} 
                                    size={"24"}
                                    iconType={"Calendar"}
                                />
                            </Icon>
                            <CenterInfoBox>
                                <RaceValue>{displayPeriod.lastEntry.race}</RaceValue>
                                <DateValue>{formattedDate(displayPeriod.lastEntry.date)}</DateValue>
                                <DarkLabel>Last</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>

               
                        <NextSearchOverlay 
                            stats={["entries", "points", "avgPoints", "avgPosition"]}
                            rad={"0.5rem"}
                            period={displayPeriod.period}
                            type={"drivers"}
                            overlay={overlay}
                            handleOverlay={handleOverlay}
                        />
                   
                </TopStats>
            </StatsContainer>
        </React.Fragment>
    );

};

export default PeriodStats;