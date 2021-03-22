import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectionSection from './SelectionSection';
import { RootState } from '../../store';
import { SearchState } from '../../store/searchTypes';
import { setCurrResults, setPrevResults, setSearch } from '../../store/actions';


const ResutsFor: React.FC = () => {

    const search: SearchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();


    const handleResultSelection = (selection: string | null) => {
        if(!selection) {
            dispatch( setSearch({}) );
            dispatch( setCurrResults([]) );
            dispatch( setPrevResults([]) );
            
        } else {
            dispatch( setSearch({ resultsFor: selection }) );
        }
    };

    return (
        <React.Fragment>
            <SelectionSection 
                title={"Show results for"}
                optionsArr={["drivers", "teams"]}
                selected={search.selections.resultsFor ? search.selections.resultsFor : null}
                handleSelection={handleResultSelection}
            />
        </React.Fragment>
    );
};

export default ResutsFor;