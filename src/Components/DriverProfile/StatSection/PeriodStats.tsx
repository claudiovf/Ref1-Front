import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, DriverPeriod } from '../../../types';
import { formattedDate } from '../../../utils/formatting';
import NextSearchOverlay from '../../Common/NextSearchOverlay';
import { InfoRow, InfoBox, Value, Label, Icon, SectionTitle } from '../../LayoutComponents';


const StatsContainer = styled.div<{ bg: string }>`
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: center;
    widht: 100%;

    padding-top: 1rem;

`;

const TopStats = styled.div`
    background-color: rgb(255,255,255);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0rem 1.5rem 1.5rem 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;
`;

const DarkValue = styled(Value)`
    font-size: 1.25rem;
    color: #2F2F2F;
`;

const DarkLabel = styled(Label)`
    color: #AFAFAF;
    font-size: 0.75rem;
`;

const RaceValue = styled(Value)`
    font-size: 1rem;
    color: #2F2F2F;
`;
const DateValue = styled(Value)`
    font-size: 0.75rem;
    color: #2F2F2F;
`;



const CenterInfoBox = styled(InfoBox)`
    min-width: 5rem;
`;

const InfoRowWithBorder = styled(InfoRow)`
    border-bottom: 1px solid #DDDDDD;
`;




interface Props {
    displayPeriod: DriverPeriod;
    driverStyle: CurrTeamStyles;
}
const PeriodStats: React.FC<Props> = ({ displayPeriod, driverStyle }: Props) => {
    const [ overlay, setOverlay ] = useState<boolean>(false);

    const handleOverlay = (bool: boolean) => setOverlay(bool);

   
    return (
        <React.Fragment>
            <StatsContainer bg={driverStyle.primary}>
                <SectionTitle color={driverStyle.secondary}>Summary</SectionTitle>
                <TopStats>
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
                            <Icon>&#10066;</Icon>
                            <CenterInfoBox>
                                <RaceValue>{displayPeriod.firstEntry.race}</RaceValue>
                                <DateValue>{formattedDate(displayPeriod.firstEntry.date)}</DateValue>
                                <DarkLabel>First</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>
                        <InfoRow>
                            <Icon>&#10066;</Icon>
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