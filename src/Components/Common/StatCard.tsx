import React, { useState } from 'react';
import styled from 'styled-components';
import { Stat } from '../../types';
import { InfoRow, InfoBox, Icon, SelectionButton, slideUpAnimation } from '../LayoutComponents';
import { formattedDate, formattedPeriod, formattedStat } from '../../utils/formatting';
import { useDispatch } from 'react-redux';
import { setSearch, toggleOpen } from '../../store/actions';


const isDark = (stat: string): boolean => {
    if ( stat === "wins" || stat === "pointsFinish") return false;
    else return true;
};

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

const CardOverlay = styled.div<{ rad: string; darkOverlay: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${ props => props.darkOverlay ? "rgba(47, 47, 47, 0.85)" : "rgba(255, 255, 255, 0.9)" };
    border-radius: ${props => props.rad};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: right;
`;
const MagButton = styled(SelectionButton)`
    position: absolute;
    top: 0;
    right: 0;
    min-height: 3rem;
    min-width: 3rem;
    margin: 1rem;
    padding: 0 1rem;
    font-size: 0.75rem;
`;

const Mag = styled.div`
  -webkit-transform: rotate(45deg); 
  -moz-transform: rotate(45deg); 
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  height: auto;
  font-size: 1.5rem;
`;


const NextSearchContainer = styled.div`
    position: absolute;
    top: 5rem;
    right: 0;
    margin: 1rem;
    padding: 0.5 rem 1rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: right;
`;

const SelectionButtonRight = styled(SelectionButton)`
    text-align: right;
    margin-bottom: 2rem;
    width: auto;
    max-width: 70vw;
    min-height: 3rem;
    white-space: normal;
    animation-name: ${slideUpAnimation};
    animation-duration: 0.4s;
`;

const PeriodSpan = styled.span`
    white-space: nowrap;
`;

interface Props {
    s: Stat; 
    rad: string; 
    period: string;
    type: string;
}

const StatCard: React.FC<Props> = ({s, rad, period, type}: Props) => {
    const [ overlay, setOverlay ] = useState<boolean>(false);
    const dispatch = useDispatch();

    if(s.total === 0 ) {
        return (
            <StatCardStyle dark={isDark(s.stat)} rad={rad}>
                <InfoBox>
                    <StatTitle colorTitle={!isDark(s.stat)}>{formattedPeriod(s.stat)}</StatTitle>
                    <InfoRow>
                        <Icon>&#10066;</Icon>
                        <InfoBox>
                            <StatValue colorDark={!isDark(s.stat)}>{s.total}</StatValue>
                            <StatLabel>{formattedPeriod(s.stat)}</StatLabel>
                        </InfoBox>
                    </InfoRow>
            
                </InfoBox>
                {!overlay
                ?<MagButton 
                    selected={true}
                    bg={"#ff425c"}
                    border={"#ff425c"}
                    color={"#FFFFFF"}
                    onClick={() => setOverlay(true)}>
                        <Mag>&#9906;</Mag>
                    </MagButton>
                :null
            }
            {overlay
                ? <CardOverlay rad={rad} darkOverlay={isDark(s.stat)}>
                    <MagButton 
                        selected={true}
                        bg={"#ff425c"}
                        border={"#ff425c"}
                        color={"#FFFFFF"}
                        onClick={() => setOverlay(false)}>
                            Close &#x2715;
                    </MagButton>
                    <NextSearchContainer>
                        <SelectionButtonRight 
                            selected={true}
                            bg={"#ff425c"}
                            border={"#ff425c"}
                            color={"#FFFFFF"}
                            onClick={() => {
                                
                                dispatch( setSearch({
                                    resultsFor: type,
                                    sortBy: s.stat,
                                    filterBy: period === "Career" ? "All Time" : isNaN(Number(period)) ? "Team" : "Season",
                                    period: period === "Career" ? "All Time" : period
                                }) );
                                setOverlay(false);
                                dispatch( toggleOpen() );
                            }}>
                                {` ${formattedStat(s.stat)} 
                                by ${formattedPeriod(type)} 
                                - `}<PeriodSpan> 
                                        {type === "teams" && formattedPeriod(period) === "Career" ? "All Time" : formattedPeriod(period)}
                                    </PeriodSpan>
                        </SelectionButtonRight>
                        { s.stat !== "dnfs" && s.total !== 0
                            ? <SelectionButtonRight 
                            selected={true}
                            bg={"#ff425c"}
                            border={"#ff425c"}
                            color={"#FFFFFF"}
                            onClick={() => {
                                dispatch( setSearch({
                                    resultsFor: type,
                                    sortBy: `${s.stat}_pct`,
                                    filterBy: period === "Career" ? "All Time" : isNaN(Number(period)) ? "Team" : "Season",
                                    period: period === "Career" ? "All Time" : period
                                }) );
                                setOverlay(false);
                                dispatch( toggleOpen() );
                            }}>
                                % {` 
                                    ${formattedStat(s.stat).split(" ")[1]} 
                                    ${formattedStat(s.stat).split(" ")[2] ? formattedStat(s.stat).split(" ")[2]: ""} 
                                    by ${formattedPeriod(type)}
                                    - `}<PeriodSpan> 
                                        {type === "teams" && formattedPeriod(period) === "Career" ? "All Time" : formattedPeriod(period)}
                                    </PeriodSpan>
                        </SelectionButtonRight>
                        : null}
                    </NextSearchContainer>
                </CardOverlay>
                : null
            }
            </StatCardStyle>
            
        );
    }
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
            </InfoBox>
            {!overlay
                ?<MagButton 
                    selected={true}
                    bg={"#ff425c"}
                    border={"#ff425c"}
                    color={"#FFFFFF"}
                    onClick={() => setOverlay(true)}>
                        <Mag>&#9906;</Mag>
                    </MagButton>
                :null
            }
            {overlay
                ? <CardOverlay rad={rad} darkOverlay={isDark(s.stat)}>
                    <MagButton 
                        selected={true}
                        bg={"#ff425c"}
                        border={"#ff425c"}
                        color={"#FFFFFF"}
                        onClick={() => setOverlay(false)}>
                            Close &#x2715;
                    </MagButton>
                    <NextSearchContainer>
                        <SelectionButtonRight 
                            selected={true}
                            bg={"#ff425c"}
                            border={"#ff425c"}
                            color={"#FFFFFF"}
                            onClick={() => {
                                
                                dispatch( setSearch({
                                    resultsFor: type,
                                    sortBy: s.stat,
                                    filterBy: period === "Career" ? "All Time" : isNaN(Number(period)) ? "Team" : "Season",
                                    period: period === "Career" ? "All Time" : period
                                }) );
                                setOverlay(false);
                                dispatch( toggleOpen() );
                            }}>
                                {` ${formattedStat(s.stat)} 
                                by ${formattedPeriod(type)} 
                                - `}<PeriodSpan> 
                                        {type === "teams" && formattedPeriod(period) === "Career" ? "All Time" : formattedPeriod(period)}
                                    </PeriodSpan>
                        </SelectionButtonRight>
                        { s.stat !== "dnfs" 
                            ? <SelectionButtonRight 
                            selected={true}
                            bg={"#ff425c"}
                            border={"#ff425c"}
                            color={"#FFFFFF"}
                            onClick={() => {
                                dispatch( setSearch({
                                    resultsFor: type,
                                    sortBy: `${s.stat}_pct`,
                                    filterBy: period === "Career" ? "All Time" : isNaN(Number(period)) ? "Team" : "Season",
                                    period: period === "Career" ? "All Time" : period
                                }) );
                                setOverlay(false);
                                dispatch( toggleOpen() );
                            }}>
                                % {` 
                                    ${formattedStat(s.stat).split(" ")[1]} 
                                    ${formattedStat(s.stat).split(" ")[2] ? formattedStat(s.stat).split(" ")[2]: ""} 
                                    by ${formattedPeriod(type)}
                                    - `}<PeriodSpan> 
                                        {type === "teams" && formattedPeriod(period) === "Career" ? "All Time" : formattedPeriod(period)}
                                    </PeriodSpan>
                        </SelectionButtonRight>
                        : null}
                    </NextSearchContainer>
                </CardOverlay>
                : null
            }
        </StatCardStyle>
    );
};

export default StatCard;