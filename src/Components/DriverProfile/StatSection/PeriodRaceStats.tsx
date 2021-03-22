import React from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, DriverPeriod, Stat } from '../../../types';
import { SectionTitle } from '../../LayoutComponents';
import StatCard from '../../Common/StatCard';


const StatsContainer = styled.div<{ bg: string }>`
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: center;
    widht: 100%;
`;

const RaceStats = styled.div`
    background-color: rgb(255,255,255);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0rem 1.5rem 1.5rem 1.5rem;
    border-radius: 0.5rem;
`;





interface Props {
    displayPeriod: DriverPeriod;
    driverStyle: CurrTeamStyles;
}
const PeriodRaceStats: React.FC<Props> = ({ displayPeriod, driverStyle }: Props) => {

   
    return (
        <React.Fragment>
            <StatsContainer bg={driverStyle.primary}>
                <SectionTitle color={driverStyle.secondary} >Race Stats</SectionTitle>
                <RaceStats>
                        {displayPeriod.stats.map((s: Stat) => {
                            if (s.stat === 'fastestLaps') {
                                return null;
                            }
                            else if (displayPeriod.stats.indexOf(s) === 0) {
                                return (
                                    <StatCard 
                                    key={s.stat} 
                                    s={s} 
                                    rad={"0.5rem 0.5rem 0 0"} 
                                    period={displayPeriod.period}
                                    type={"drivers"}/>
                                );
                            }
                            else if (displayPeriod.stats.indexOf(s) === displayPeriod.stats.length - 1) {
                                return (
                                    <StatCard 
                                    s={s} 
                                    rad={"0 0 0.5rem 0.5rem"} 
                                    key={s.stat} 
                                    period={displayPeriod.period}
                                    type={"drivers"}/>
                                );
                            }
                            else {
                                return (
                                    <StatCard 
                                    s={s} 
                                    rad={"none"} 
                                    key={s.stat} 
                                    period={displayPeriod.period}
                                    type={"drivers"}/>
                                );
                            }
                        })}
                </RaceStats>
            </StatsContainer>
        </React.Fragment>
    );

};

export default PeriodRaceStats;