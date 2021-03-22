import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, TeamPeriod } from '../../../types';
import { formattedPeriod } from '../../../utils/formatting';
import { SelectionButton, Scroll } from '../../LayoutComponents';

const ScrollWrapper = styled.div<{ bg: string}>`
    background-color: ${props => props.bg };
    height: auto;
    width: 100%;
    padding: 0.5rem 0;
    position: -webkit-sticky;
    position: sticky;
    top: 6rem;
    z-index:1000;
`;


interface Props {
    periods: TeamPeriod[];
    handlePeriodChange: (selected: string) => void;
    style: CurrTeamStyles;
    periodSelected: string;
}

const TeamPeriodButtons: React.FC<Props> = ({periods, handlePeriodChange, style, periodSelected}: Props) => {
    if(!periods) return null;

    const selRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if(selRef && selRef.current) {
            selRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
        }

    }, [selRef]);
    
    const seasonPeriods = periods.map(p => 
        !isNaN(Number(p.period)) ? p.period : null
    );


    const displayPeriods: string[] = [];
    [["All Time"], seasonPeriods].map(arr => {
        return arr.map(period => period !== null ? displayPeriods.push(period): null);
    });

    return (
        <React.Fragment>
            <ScrollWrapper bg={style.primary}>
                <Scroll>
                    { 
                    displayPeriods.map(period => period !== null
                        ? period === periodSelected 
                            ? <SelectionButton 
                                ref={selRef}
                                selected={true}
                                bg={style.secondary}
                                color={style.secondary === "#FFFFFF" || style.secondary === '#FFF500' ? "#2F2F2F" : "#FFFFFF"}
                                border={style.secondary}
                                key={period}
                                onClick={() => handlePeriodChange(period)}>
                                    {formattedPeriod(period)}
                            </SelectionButton> 
                            : <SelectionButton 
                                selected={false}
                                bg={style.primary}
                                color={style.secondary}
                                border={style.secondary}
                                key={period}
                                onClick={() => handlePeriodChange(period)}>
                                    {formattedPeriod(period)}
                            </SelectionButton> 
                        : null )
                    }
                </Scroll>
            </ScrollWrapper>
        </React.Fragment>
    );

};

export default TeamPeriodButtons;