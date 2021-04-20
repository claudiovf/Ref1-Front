
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { setCurrResults, setPrevResults, setSearch, toggleOpen } from '../../../store/actions';
import { SearchState } from '../../../store/searchTypes';
import { TeamResult } from '../../../types';
import { getDriverStyle, patchId } from '../../../utils/currentInfo';
import { resultItemStyle, splitStat, getDisplayStat } from '../../../utils/formatting';
import { SelectionButton, StyledLink } from '../../LayoutComponents';
import { Tr, Td, Rank, TableCell } from '../TableComponents';


const OptionsButton = styled(SelectionButton)`
    min-width: 4.25rem;
`;

const ResultLink = styled(StyledLink)`
    color: #2E2E2E;
`;


interface Props {
    resultList: TeamResult[];
    rankPrev: boolean;
}

const TeamsTableRows: React.FC<Props> = ({ resultList, rankPrev }: Props) => {
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
            {resultList.map(team => <Tr key={team.constructorId}>
                <Td><Rank>
                    { rankPrev
                        ? search.prevResults.indexOf(team) + 1
                        : search.currResults.indexOf(team) + search.prevResults.length + 1
                    }
                </Rank></Td>
                <Td>
                    <TableCell>
                        <ResultLink 
                            to={"/profile/team/" + team.constructorId} 
                            onClick={() => closeSearch()}>
                            <OptionsButton 
                                selected={true}
                                bg={resultItemStyle(team.constructorId, null)}
                                color={getDriverStyle(patchId(team.constructorId, null)).secondary}
                                border={resultItemStyle(team.constructorId, null)}
                                >
                                    {team.name}
                            </OptionsButton>
                        </ResultLink>
                    </TableCell>
                </Td>
                {
                    search.selections.sortBy 
                    ? <>
                        <Td>{getDisplayStat(team, splitStat(search.selections.sortBy))}</Td>

                        <Td>{search.selections.filterBy !== "Season" 
                            && splitStat(search.selections.sortBy).stat !== "entries"
                            ? team.reqEntry.entries
                            : splitStat(search.selections.sortBy).stat !== "entries"
                                ? splitStat(search.selections.sortBy).stat === "points"
                                    ? team.reqEntry.bestResult
                                    : team.reqEntry.entries
                                : null
                        }</Td>
                    </>
                    : null
                }
            </Tr>)}
        </>
    );
};

export default TeamsTableRows;