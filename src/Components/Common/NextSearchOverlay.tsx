import React from 'react';
import styled from 'styled-components';
import { SelectionButton, slideUpAnimation } from '../LayoutComponents';
import { formattedPeriod, formattedStat, isDark } from '../../utils/formatting';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, toggleOpen } from '../../store/actions';
import { eventGa } from '../../RouteTracker';
import { Search } from '@styled-icons/fluentui-system-filled';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';


const CardOverlay = styled.div<{ rad: string; darkOverlay: boolean; darkMode: boolean; }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${props => props.darkMode 
        ? `background-color: rgb(0,0,0, 0.7);`
        : `background-color: ${props.darkOverlay ? "rgba(47, 47, 47, 0.85)" : "rgba(255, 255, 255, 0.9)" };`}
    border-radius: ${props => props.rad};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: right;

    @media (min-width: 768px) {
        background-color: rgba(47, 47, 47, 0.85);
        border-radius: 0.5rem;
    }
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

    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.1);
          }
    }
`;

const Mag = styled.div`
  -webkit-transform: rotate(90deg); 
  -moz-transform: rotate(90deg); 
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
  height: auto;
  font-size: 1.5rem;
`;

const SearchIcon = styled(Search)`
      padding: 0;
      margin: 0.5rem 0 ;
`;

const NextSearchContainer = styled.div`
    position: absolute;
    top: 5rem;
    right: 0;
    margin: 0 1rem;
    padding: 0.5 rem 1rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: right;
`;

const SelectionButtonRight = styled(SelectionButton)`
    text-align: right;
    margin-bottom: 0.5rem;
    width: auto;
    max-width: 70vw;
    min-height: 3rem;
    white-space: normal;
    animation-name: ${slideUpAnimation};
    animation-duration: 0.4s;
    font-size: 1rem;
`;

const PeriodSpan = styled.div`
font-family: "Work Sans Reg";
    white-space: nowrap;
    font-size: 0.75rem;
`;



interface Props {
    stats: string[]; 
    rad: string; 
    period: string;
    type: string;
    overlay: boolean;
    handleOverlay: (bool: boolean) => void;
}

const NextSearchOverlay: React.FC<Props> = ({stats, rad, period, type, overlay, handleOverlay}: Props) => {
    const dispatch = useDispatch();
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const handleNextSearch = (pct: boolean, stat: string) => {
        dispatch( setSearch({
            resultsFor: type,
            sortBy: pct ? `${stat}_pct` : stat,
            filterBy: period === "Career" ? "All Time" : isNaN(Number(period)) ? "Team" : "Season",
            period: period === "Career" ? "All Time" : period
        }) );
        handleOverlay(false);
        dispatch( toggleOpen() );
        eventGa("NextSearch", `${type} - ${stat} - Period: ${period}`, type);
    };
      
    return (
        <>
            {!overlay
                ?<MagButton 
                    selected={true}
                    bg={"#ff425c"}
                    border={"#ff425c"}
                    color={"#FFFFFF"}
                    onClick={() => handleOverlay(true)}>
                        <Mag><SearchIcon size={20} /></Mag>
                    </MagButton>
                :null
            }
            {overlay
                ? <CardOverlay rad={rad} darkOverlay={isDark(stats[0])} darkMode={settings.isDarkMode}>
                    <MagButton 
                        selected={true}
                        bg={"#ff425c"}
                        border={"#ff425c"}
                        color={"#FFFFFF"}
                        onClick={() => handleOverlay(false)}>
                            Close &#x2715;
                    </MagButton>
                    <NextSearchContainer>
                        {stats.map(stat => 
                            ["wins", "podiums", "pointsFinish", "dnfs", 
                            "entries", "points", "avgPoints", "avgPosition"].includes(stat) 
                            ? <SelectionButtonRight 
                                selected={true}
                                key={stat}
                                bg={"#ff425c"}
                                border={"#ff425c"}
                                color={"#FFFFFF"}
                                onClick={() => handleNextSearch(false, stat)}>
                                    {formattedStat(stat)}
                                    <PeriodSpan> 
                                        {type === "teams" && formattedPeriod(period) === "Career" ? "All Time" : formattedPeriod(period)}
                                        -{formattedPeriod(type)}
                                    </PeriodSpan>
                            </SelectionButtonRight>    
                            : null
                        )}
                        { stats.map(stat => 
                            !["dnfs", "entries", "points", "avgPoints", "avgPosition"].includes(stat)
                            ? <SelectionButtonRight 
                            selected={true}
                            bg={"#ff425c"}
                            key={stat}
                            border={"#ff425c"}
                            color={"#FFFFFF"}
                            onClick={() => handleNextSearch(true, stat)}>
                                Best % {` 
                                    ${formattedStat(stat).split(" ")[1]} 
                                    ${formattedStat(stat).split(" ")[2] ? formattedStat(stat).split(" ")[2]: ""} `}
                                                    <PeriodSpan> 
                                    {type === "teams" && formattedPeriod(period) === "Career" ? "All Time" : formattedPeriod(period)}
                                    -{formattedPeriod(type)}
                                </PeriodSpan>
                        </SelectionButtonRight>
                        : null    
                        )}
                    </NextSearchContainer>
                </CardOverlay>
                : null
            }
        </>
    );
};

export default NextSearchOverlay;