
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GET_DRIVER_RESULTS_MONGO } from '../../../queries';
import { RootState } from '../../../store';
import { setCurrResults, setPrevResults } from '../../../store/actions';
import { SearchState } from '../../../store/searchTypes';
import { SettingsState } from '../../../store/SettingsStore/settingsTypes';
import { DriverResult } from '../../../types';
import { getPeriod, splitStat, getSecondSort } from '../../../utils/formatting';
import Spinner from '../../Common/Spinner';
import { SelectionButton, Spacer } from '../../LayoutComponents';
import { Table, Tbody, Tr, Th, TableCell } from '../TableComponents';
import DriversResultsRow from './DriversTableRows';



const LoadMoreContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2rem;
`;

const OptionsButton = styled(SelectionButton)`
    min-width: 4.25rem;
    margin-bottom: 4rem;
`;



const DriverResults: React.FC = () => {
    const [ hasNextPage, setHasNextPage ] = useState<boolean>(false);
    const search: SearchState = useSelector((state: RootState) => state.search);
    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();

    
    if (!search.selections.period || !search.selections.sortBy ) return null;

    const { loading, data } = useQuery<{ findDriverResultsMongo: DriverResult[] }>(GET_DRIVER_RESULTS_MONGO,
        { 
            fetchPolicy: "cache-and-network", 
            variables: {
                "period": getPeriod(search.selections.period),
                "stat": splitStat(search.selections.sortBy).stat,
                "skip": search.prevResults.length,
                "pct": splitStat(search.selections.sortBy).isPct            
            }
        });
        
  useEffect(() => {
      if ( data ) {
          
        if ( data.findDriverResultsMongo.length === 26 ) {
            let spliced: DriverResult[] = [];
            spliced = spliced.concat(data.findDriverResultsMongo);
            spliced.splice(-1, 1);
            dispatch(setCurrResults(spliced));
            setHasNextPage(true);
        } else {
            dispatch(setCurrResults(data.findDriverResultsMongo));
            setHasNextPage(false);
        }
      }
  }, [data]);

  if ( loading && search.prevResults.length === 0 ) return <> <Spacer /><Spinner /> </>;

  if ( search.currResults.length === 0 ) return null;

    return (
        <React.Fragment>
            <Table darkMode={settings.isDarkMode}>
                <Tbody>
                    <Tr>
                        <Th></Th>
                        <Th><TableCell>Name</TableCell></Th>
                        <Th>{splitStat(search.selections.sortBy).isPct ? "%" : "Total" }</Th>
                        <Th>{search.selections.filterBy !== "Season" && splitStat(search.selections.sortBy).stat !== "entries"
                                ? "Entries"
                                : splitStat(search.selections.sortBy).stat !== "entries"
                                    ? getSecondSort(splitStat(search.selections.sortBy))
                                    : null
                        }</Th>
                    </Tr>
                    <DriversResultsRow 
                            resultList={(search.prevResults as DriverResult[])} 
                            rankPrev={true}/>
                    
                    {loading && search.prevResults.length !== 0
                        ? null
                        : <DriversResultsRow 
                            resultList={(search.currResults as DriverResult[])} 
                            rankPrev={false}/>
                        }
                </Tbody>
            </Table>

            <LoadMoreContainer>
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
            </LoadMoreContainer>
            
        </React.Fragment>
    );
    
};

export default DriverResults;
