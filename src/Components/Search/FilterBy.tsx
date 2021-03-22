import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectionSection from './SelectionSection';
import FilterModal from './FilterModal';
import { RootState } from '../../store';
import { SearchState } from '../../store/searchTypes';
import { setCurrResults, setPrevResults, setSearch } from '../../store/actions';




const FilterBy: React.FC = () => {

    const search: SearchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();


    const handleFilterSelection = (selection: string | null) => {
        if(!selection) {
            const updatedSelection = search.selections;
            delete updatedSelection.filterBy;
            delete updatedSelection.period;
            dispatch( setSearch(updatedSelection) );
            dispatch( setCurrResults([]) );
            dispatch( setPrevResults([]) );

        } else {
            if(selection === "All Time") {
                dispatch( setSearch({ ...search.selections, period: selection, filterBy: selection}) );
            } else {
                dispatch( setSearch({ ...search.selections, filterBy: selection }) );
            }
        }
    };

    const filterOptionsFor = (resultSel: string): string[] => {
        if ( resultSel === "drivers" ) return ["All Time", "Season", "Team"];
        else return ["All Time", "Season"];
    };
    
 
    return (
        <React.Fragment>
            {search.selections.resultsFor && ( search.selections.sortBy || search.selections.filterBy )
                ? <>
                    <SelectionSection 
                        title={"Filter by"}
                        optionsArr={filterOptionsFor(search.selections.resultsFor)}
                        selected={search.selections.filterBy ? search.selections.filterBy : null}
                        handleSelection={handleFilterSelection}
                    />
                    <FilterModal />
                </>
                : null
            }
        </React.Fragment>
    );
};

export default FilterBy;