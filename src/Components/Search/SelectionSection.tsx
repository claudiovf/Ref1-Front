import React from 'react';
import styled from 'styled-components';
import { Section, Title, Scroll, SelectionButton, slideUpAnimation } from '../LayoutComponents';
import { formattedPeriod, formattedStat } from '../../utils/formatting';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SearchState } from '../../store/searchTypes';




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

const ScrollCover = styled.div`
    min-width: 100%;
    background-color: #FFFFFF;
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
    
    if (!selected) {
        return(
            <React.Fragment>
                <ScrollCover>
                    <SectionSearch>
                        <FilterTitle>{title}</FilterTitle>
                        <Scroll>
                            {
                                optionsArr.map(item => 
                                    <SelectionButton 
                                        selected={false}
                                        bg={"#e4eced"}
                                        color={"#2F2F2F"}
                                        border={"#e4eced"}
                                        key={item}
                                        onClick={() => handleSelection(item)}
                                        >
                                            {formattedPeriod(formattedStat(item))} 
                                    </SelectionButton> )
                            }
                        </Scroll>
                    </SectionSearch>
                </ScrollCover>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
                <SectionSearch>
                    <FilterTitle>{title}</FilterTitle>
                    <Scroll>
                        <SelectionButton 
                            selected={true}
                            bg={"#2F2F2F"}
                            color={"#FFFFFF"}
                            border={"#2F2F2F"}
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
          
                    </Scroll>
                </SectionSearch>
            </React.Fragment>
    );
};

export default SelectionSection;