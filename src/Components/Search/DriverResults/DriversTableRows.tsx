
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { setCurrResults, setPrevResults, setSearch, toggleOpen } from '../../../store/actions';
import { SearchState } from '../../../store/searchTypes';
import { Driver } from '../../../types';
import { getDriverStyle, patchId } from '../../../utils/currentInfo';
import { resultItemStyle, splitStat, getDisplayStat } from '../../../utils/formatting';
import { SelectionButton, StyledLink } from '../../LayoutComponents';
import { Tr, Td, TableCell, Rank } from '../TableComponents';


const OptionsButton = styled(SelectionButton)`
    min-width: 4.25rem;
`;

const ResultLink = styled(StyledLink)`
    color: #2E2E2E;
`;


interface Props {
    resultList: Driver[];
    rankPrev: boolean;
}

const DriversTableRows: React.FC<Props> = ({resultList, rankPrev}: Props) => {
    const search: SearchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();


    const closeSearch = () => {
        dispatch( setSearch({}) );
        dispatch( setCurrResults([]) );
        dispatch( setPrevResults([]) );

        dispatch( toggleOpen() );
    };


    return (
        <>
            {resultList.map(driver => <Tr key={driver.driverId}>
                <Td><Rank>
                    { rankPrev 
                        ? search.prevResults.indexOf(driver) + 1
                        : search.currResults.indexOf(driver) + search.prevResults.length + 1
                    }
                </Rank></Td>
                <Td>
                    <TableCell>
                        <ResultLink 
                            to={"/profile/driver/" + driver.driverId} 
                            onClick={() => closeSearch()}>
                            <OptionsButton 
                                selected={true}
                                bg={resultItemStyle(driver.driverId, driver.givenName)}
                                color={getDriverStyle(patchId(driver.driverId, driver.givenName)).secondary}
                                border={resultItemStyle(driver.driverId, driver.givenName)}
                                >
                                    {driver.givenName} {driver.familyName}
                            </OptionsButton>
                        </ResultLink>
                    </TableCell>
                </Td>
                {
                    search.selections.sortBy 
                    ? <>
                        <Td>{getDisplayStat(driver, splitStat(search.selections.sortBy))}</Td>

                        <Td>{search.selections.filterBy !== "Season" 
                            && splitStat(search.selections.sortBy).stat !== "entries"
                            ? driver.entries[0].entries
                            : splitStat(search.selections.sortBy).stat !== "entries"
                                ? splitStat(search.selections.sortBy).stat === "points"
                                    ? driver.entries[0].bestResult
                                    : driver.entries[0].entries
                                : null
                        }</Td>
                    </>
                    : null
                }
            </Tr>)
            }
        </>
    );
    
};

export default DriversTableRows;
