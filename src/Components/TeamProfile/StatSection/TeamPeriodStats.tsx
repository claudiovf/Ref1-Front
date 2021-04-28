import React, { useState } from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, TeamPeriod } from '../../../types';
import { formattedPeriod, formattedDate } from '../../../utils/formatting';
import NextSearchOverlay from '../../Common/NextSearchOverlay';
import { InfoRow, InfoBox, Value, Label, Icon, SectionTitle } from '../../LayoutComponents';
import { Calendar } from '@styled-icons/zondicons';

const StatsContainer = styled.div<{ bg: string }>`
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding-top: 1rem;

    @media (min-width: 768px) {
        width: 100%;
        
    }
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
    @media (min-width: 768px) {
        max-width: 35rem;
        margin-left: 3.5rem;
    }
`;

const TeamSectionTitle = styled(SectionTitle)`
    @media (min-width: 768px) {
        margin-left: 2rem;
    }
`;

const DarkValue = styled(Value)`
    font-size: 1rem;
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

const InfoRowDrivers = styled(InfoRow)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0 0 0 ;
`;
const DriversLabel = styled.div`
    font-family: "Work Sans Semi Bold";
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #AFAFAF;
    font-size: 0.75rem;
    padding-bottom: 1rem;
`;

const ExpandButton = styled.div`
    font-family: "Work Sans Semi Bold";
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    background-color: #EFEFEF;
    color: #2F2F2F;
    border-radius: 1rem;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.1);
          }
    }
`;




interface Props {
    displayPeriod: TeamPeriod;
    teamStyle: CurrTeamStyles;
}
const TeamPeriodStats: React.FC<Props> = ({ displayPeriod, teamStyle }: Props) => {
    const [ expandedDrivers, setExpandedDrivers ] = useState<boolean>(false);
    const [ overlay, setOverlay ] = useState<boolean>(false);

    const handleOverlay = (bool: boolean) => setOverlay(bool);

   const correctedPeriod = (period: string): string => period === 'Career' ? 'All Time' : period;

    return (
        <React.Fragment>
            <StatsContainer bg={teamStyle.primary}>
                <TeamSectionTitle color={teamStyle.secondary}>Summary</TeamSectionTitle>
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
                            <Icon><Calendar size={24} /></Icon>
                            <CenterInfoBox>
                                <RaceValue>{displayPeriod.firstEntry.race}</RaceValue>
                                <DateValue>{formattedDate(displayPeriod.firstEntry.date)}</DateValue>
                                <DarkLabel>First Entry</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>
                        <InfoRowWithBorder>
                            <Icon><Calendar size={24} /></Icon>
                            <CenterInfoBox>
                                <RaceValue>{displayPeriod.lastEntry.race}</RaceValue>
                                <DateValue>{formattedDate(displayPeriod.lastEntry.date)}</DateValue>
                                <DarkLabel>Last Entry</DarkLabel>
                            </CenterInfoBox>
                        </InfoRowWithBorder>
                        <InfoRowDrivers>
                                <DriversLabel>{correctedPeriod(displayPeriod.period)} Drivers</DriversLabel>
                                { displayPeriod.drivers.length <= 5
                                    ? <RaceValue>{displayPeriod.drivers.map(d => <div key={d}>{formattedPeriod(d)}</div>)}</RaceValue>
                                    : expandedDrivers 
                                    ? <>
                                        <RaceValue>{displayPeriod.drivers.map(d => <div key={d}>{formattedPeriod(d)}</div>)}</RaceValue>
                                        <ExpandButton onClick={() => setExpandedDrivers(false)}>See Less</ExpandButton>
                                      </>
                                    : <>
                                        <RaceValue>{displayPeriod.drivers.map(d => {
                                            if (displayPeriod.drivers.indexOf(d) <= 5) {
                                                return (
                                                    <div key={d}>{formattedPeriod(d)}</div>
                                                );
                                            }
                                        })}</RaceValue>
                                        <ExpandButton onClick={() => setExpandedDrivers(true)}>See More</ExpandButton>
                                      </>
                                }
                                
                        </InfoRowDrivers>
                        <NextSearchOverlay 
                            stats={["entries", "points", "avgPoints", "avgPosition"]}
                            rad={"0.5rem"}
                            period={displayPeriod.period}
                            type={"teams"}
                            overlay={overlay}
                            handleOverlay={handleOverlay}
                        />
                </TopStats>
            </StatsContainer>
        </React.Fragment>
    );

};

export default TeamPeriodStats;