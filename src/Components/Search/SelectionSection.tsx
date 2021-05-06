import React from 'react';
import styled from 'styled-components';
import { Section, Title, Scroll, SelectionButton, slideUpAnimation } from '../LayoutComponents';
import { formattedPeriod, formattedStat } from '../../utils/formatting';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SearchState } from '../../store/searchTypes';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';




const FilterTitle = styled(Title)`
    font-family: "Work Sans Bold";
    font-size: 1rem;
    
    @media (min-width: 768px) {
        padding-bottom: 0.25rem;
    }
`;

const Unselect = styled.span`
    font-family: "Work Sans Bold";
    margin-left: 0.5rem;
`;

const ScrollCover = styled.div<{ darkMode: boolean}>`
    min-width: 100%;
    background-color: ${props => props.darkMode ? "#2f2f2f" : "#FFFFFF" };
    overflow: hidden;
    animation-name: ${slideUpAnimation};
    animation-duration: 0.3s;
    
    @media (max-width: 767px) {
        max-height: 5.175rem;
        animation-name: ${slideUpAnimation};
        animation-duration: 0.3s
    }

`;

const SectionSearch = styled(Section)`
    @media (min-width: 768px) {
        width: 80%;
        margin: 0;
        align-items: flex-start;
        justify-content: flex-start;
    }
`;

const SearchScrollNotSelected = styled(Scroll)`
    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`;
const SearchScroll = styled(Scroll)`
    @media (min-width: 768px) {
        justify-content: flex-start;
        align-items: flex-start;
        max-height: 3rem;
        overflow:hidden;
    }
`;



interface Props {
    selected: string | null;
    optionsArr: string[];
    title: string;
    handleSelection: (selection: string | null ) => void;
}

const SelectionSection: React.FC<Props> = ({ selected, optionsArr, title, handleSelection }: Props) => {
    const search: SearchState = useSelector((state: RootState) => state.search);
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    if (!selected) {
        return(
            <React.Fragment>
                <ScrollCover darkMode={settings.isDarkMode}>
                    <SectionSearch>
                        <FilterTitle darkMode={settings.isDarkMode}>{title}</FilterTitle>
                        <SearchScrollNotSelected>
                            {
                                optionsArr.map(item => 
                                    <SelectionButton 
                                        selected={false}
                                        bg={settings.isDarkMode ? "#4f4f4f" : "#e4eced"}
                                        color={settings.isDarkMode ? "rgb(255,255,255,0.9)" : "#2F2F2F"}
                                        border={"rgb(0,0,0,0)"}
                                        key={item}
                                        onClick={() => handleSelection(item)}
                                        >
                                            {formattedPeriod(formattedStat(item))} 
                                    </SelectionButton> )
                            }
                        </SearchScrollNotSelected>
                    </SectionSearch>
                </ScrollCover>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
                <SectionSearch>
                    <FilterTitle darkMode={settings.isDarkMode}>{title}</FilterTitle>
                    <SearchScroll>
                        <SelectionButton 
                            selected={true}
                            bg={settings.isDarkMode ? "rgb(255,255,255, 0.5)" : "#2F2F2F"}
                            color={settings.isDarkMode ? "#fff" : "#fff"}
                            border={"rgb(0,0,0,0)"}
                            >
                                {formattedPeriod(formattedStat(selected))} 
                                {search.selections.period && ( selected === "Season" || selected === "Team" )
                                    ? ` - ${typeof search.selections.period === 'string' 
                                        ? formattedPeriod(search.selections.period) 
                                        : search.selections.period.name}` 
                                    : null}
                                <Unselect onClick={() => handleSelection(null)}>
                                    &#x2715;</Unselect>
                        </SelectionButton> 
          
                    </SearchScroll>
                </SectionSearch>
            </React.Fragment>
    );
};

export default SelectionSection;