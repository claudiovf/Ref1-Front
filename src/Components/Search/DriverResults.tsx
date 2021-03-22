
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GET_DRIVER_RESULTS } from '../../queries';
import { RootState } from '../../store';
import { setCurrResults, setPrevResults, setSearch, toggleOpen } from '../../store/actions';
import { SearchState } from '../../store/searchTypes';
import { Driver } from '../../types';
import { getDriverStyle, patchId } from '../../utils/currentInfo';
import { getPeriod, resultItemStyle, splitStat } from '../../utils/formatting';
import Spinner from '../Common/Spinner';
import { SelectionButton, Spacer, StyledLink } from '../LayoutComponents';

const Table = styled.table`
    width: 100%;
    max-width: 100vw;
    height: auto;
    margin: 2rem 0 1rem 0;
    padding: 1rem;
`;

const Tbody = styled.tbody`
    max-width: 100vw;
`;  

const Th = styled.th`
    font-family: "Work Sans Semi Bold";
    color: #2F2f2f;
    padding: 0.25rem 0;
    font-size: 0.75rem;
`;

const Td = styled.td`
    font-family: "Work Sans Bold";
    color: #2F2F2F;
    padding: 0.25rem 0;
    font-size: 1rem;
`;
const Tr = styled.tr`
    & ${Th}:nth-child(2) {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        
    }
     ${Th}:nth-child(1) {
         color: #FFFFFF;
    }
     ${Th}:nth-child(4) {
         color: #BEBEBE;
    }
     ${Td}:nth-child(4) {
        color: #BEBEBE;
    }
    
`;

const Rank = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 0.25rem;
`;

const TableCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0.25rem 0.5rem;
    max-width: 14rem;
    & span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;    
    }
`;

const CloseContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
`;

const OptionsButton = styled(SelectionButton)`
    min-width: 4.25rem;
`;

const ResultLink = styled(StyledLink)`
    color: #2E2E2E;
`;




const DriverResults: React.FC = () => {
    const [ hasNextPage, setHasNextPage ] = useState<boolean>(false);
    const search: SearchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();


    const closeSearch = () => {
        dispatch( setSearch({}) );
        dispatch( setCurrResults([]) );
        dispatch( setPrevResults([]) );

        dispatch( toggleOpen() );
    };

    
    if (!search.selections.period || !search.selections.sortBy ) return null;

    const { loading, data } = useQuery<{ findDriverResults: Driver[] }>(GET_DRIVER_RESULTS,
        { variables: {
            "period": getPeriod(search.selections.period),
            "stat": splitStat(search.selections.sortBy).stat,
            "skip": search.prevResults.length,
            "pct": splitStat(search.selections.sortBy).isPct            
          }});
        
  useEffect(() => {
      if ( data ) {
          
        if ( data.findDriverResults.length === 26 ) {
            let spliced: Driver[] = [];
            spliced = spliced.concat(data.findDriverResults);
            spliced.splice(-1, 1);
            dispatch(setCurrResults(spliced));
            setHasNextPage(true);
        } else {
            dispatch(setCurrResults(data.findDriverResults));
            setHasNextPage(false);
        }
      }
  }, [data]);

  if ( loading && search.prevResults.length === 0 ) return <> <Spacer /><Spinner /> </>;

  if ( search.currResults.length === 0 ) return null;

    return (
        <React.Fragment>
            <Table>
                <Tbody>
                    <Tr>
                        <Th></Th>
                        <Th><TableCell>Name</TableCell></Th>
                        <Th>{splitStat(search.selections.sortBy).isPct ? "%" : "Total" }</Th>
                        <Th>Entries</Th>
                    </Tr>
                    {(search.prevResults as Array<Driver>).map(driver => <Tr key={driver.driverId}>
                        <Td><Rank>{search.prevResults.indexOf(driver) + 1}</Rank></Td>
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
                        <Td>{
                            search.selections.sortBy 
                            ? splitStat(search.selections.sortBy).isPct 
                                ? driver.entries[0].stats[0].pct.toFixed(2) 
                                : driver.entries[0].stats[0].total
                            : null
                        }</Td>
                        <Td>{driver.entries[0].entries}</Td>
                    </Tr>)}
                    
                    {loading && search.prevResults.length !== 0
                        ? null
                        : (search.currResults as Array<Driver>).map(driver => 
                            <Tr key={driver.driverId + `1`} >
                                    <Td><Rank>{search.currResults.indexOf(driver) + search.prevResults.length + 1}</Rank></Td>
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
                                    <Td>{
                                        search.selections.sortBy 
                                        ? splitStat(search.selections.sortBy).isPct 
                                            ? driver.entries[0].stats[0].pct.toFixed(2) 
                                            : driver.entries[0].stats[0].total
                                        : null
                                    }</Td>
                                    <Td>{driver.entries[0].entries}</Td>
                            </Tr>)}
                </Tbody>
            </Table>

            <CloseContainer>
                {loading && search.prevResults.length !== 0 
                    ? <> <Spinner /> </> 
                    : hasNextPage 
                        ?<OptionsButton
                            selected={false}
                            bg={"#FFF"}
                            color={"#2F2F2F"}
                            border={"#FFF"}
                            onClick={() => dispatch(setPrevResults(search.prevResults.concat(search.currResults)))}  
                        >
                            Load More
                        </OptionsButton>
                        : null
                }
            </CloseContainer>
            
        </React.Fragment>
    );
    
};

export default DriverResults;
