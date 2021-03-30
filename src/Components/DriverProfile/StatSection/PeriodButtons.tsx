import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, DriverPeriod } from '../../../types';
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
    z-index: 1000;

    @media (min-width: 768px) {
        width: 100%;
      }
`;

const ProfileScroll =styled(Scroll)`
    @media (min-width: 768px) {
        justify-content: center;
        align-items: center;
        padding: 0 3rem 0 3rem;
    }
`;

interface Props {
    periods: DriverPeriod[];
    handlePeriodChange: (selected: string) => void;
    style: CurrTeamStyles;
    periodSelected: string;
}

const PeriodButtons: React.FC<Props> = ({periods, handlePeriodChange, style, periodSelected}: Props) => {
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

     const teamPeriods = periods.map(p => 
        isNaN(Number(p.period)) && p.period !== "Career" ? p.period : null
    );

    const displayPeriods: string[] = [];
    [teamPeriods.reverse(),["Career"], seasonPeriods].map(arr => {
        return arr.map(period => period !== null ? displayPeriods.push(period): null);
    });

    return (
        <React.Fragment>
            <ScrollWrapper bg={style.primary}>
                <ProfileScroll>
                    {displayPeriods.map(period => period !== null
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
                </ProfileScroll>
            </ScrollWrapper>
        </React.Fragment>
    );

};

export default PeriodButtons;