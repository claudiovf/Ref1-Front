import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GET_TEAM_NAMES } from '../../queries';
import { RootState } from '../../store';
import { setSearch, setTeamNames } from '../../store/actions';
import { SearchState } from '../../store/searchTypes';
import { Team } from '../../types';
import { getDriverStyle } from '../../utils/currentInfo';
import { formattedPeriod } from '../../utils/formatting';
import Spinner from '../Common/Spinner';
import { SelectionButton, Title } from '../LayoutComponents';





const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 1rem 1rem 0 0;
    padding-top: 1rem;
`;

const ModalContainer = styled.div<{ teams: boolean }>`
    height: ${props => props.teams ? "78%" : "62vh"};
    padding-top: ${props => props.teams ? "0" : "5rem"};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;
    @media (min-width: 768px) {
        overflow: hidden;
    }
`;

const OptionsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    width: auto;
    height: auto;
    min-height: 12rem;
    margin: 0.5rem 1.5rem;
    overflow: auto;
    @media (min-width: 768px) {
        // overflow: hidden;
        width: 96%;
        padding: 0 2rem;
        margin: 0 2rem;
    }
`;


const FilterTitle = styled(Title)`
    font-family: "Work Sans Bold";
    font-size: 1.25rem;
`;

const TeamTitle = styled(Title)`
    font-family: "Work Sans Bold";
    font-size: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1.5rem 0 0.75rem 0;
`;

const CloseContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;


const OptionsButton = styled(SelectionButton)`
    min-width: 4.25rem;
`;



const FilterModal: React.FC = () => {

    const search: SearchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();

    const teamNames = useQuery<{ findManyTeams: Team[] }>(GET_TEAM_NAMES);

    useEffect(() => {
        if ( teamNames.data ) {
            dispatch(setTeamNames(teamNames.data.findManyTeams));
        }
    }, [teamNames.data]);

    const handleClose = () => {
        const updatedSelection = search.selections;
        delete updatedSelection.filterBy;
        dispatch( setSearch(updatedSelection) );

    };

    
    if (search.selections.filterBy && search.selections.filterBy !== "All Time" && !search.selections.period) {

    const options = [];
    for (let i = 1950; i < 2022; i++) {
        options.push(i.toString());
    }

    const currentTeams = search.teamNames.filter(team => getDriverStyle(team.constructorId).team !== "NA");
    const sortedTeams = search.teamNames.slice().sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1 );

        return (
                <Overlay>
                    <ModalContainer teams={ search.selections.filterBy !== "Season" }>
                        <FilterTitle>Select a {formattedPeriod(search.selections.filterBy)}</FilterTitle>
                        {
                            search.selections.filterBy === "Season"
                            ? <OptionsContainer>
                                {options.reverse().map(option => <OptionsButton 
                                    key={option}
                                    selected={false}
                                    bg={"#e4eced"}
                                    color={"#2F2F2F"}
                                    border={"rgb(0,0,0,0)"}
                                    onClick={() => dispatch(setSearch({...search.selections, period: option}))}
                                    >
                                        {formattedPeriod(option)}
                                </OptionsButton>)}
                            </OptionsContainer>

                            : teamNames.loading 
                                ? <Spinner /> 
                                : <>
                                <OptionsContainer>
                                <TeamTitle>Current Teams</TeamTitle>
                                { 
                                    search.teamNames.length === 0
                                        ? null
                                        : currentTeams.map(option => {
                                            const optionTeam = getDriverStyle(option.constructorId);
                                            return (
                                                <OptionsButton 
                                                    key={option.constructorId}
                                                    selected={false}
                                                    bg={optionTeam.primary}
                                                    color={optionTeam.secondary}
                                                    border={"rgb(0,0,0,0)"}
                                                    onClick={() => dispatch(setSearch({...search.selections, period: option}))}
                                                    >
                                                        {formattedPeriod(option.name)}
                                                </OptionsButton>
                                            );
                                        })
                                }
                                <TeamTitle>All Teams</TeamTitle>
                                { 
                                    search.teamNames.length === 0
                                        ? null
                                        : sortedTeams.map(option => 
                                            <OptionsButton 
                                                key={option.constructorId}
                                                selected={false}
                                                bg={"#e4eced"}
                                                color={"#2F2F2F"}
                                                border={"rgb(0,0,0,0)"}
                                                onClick={() => dispatch(setSearch({...search.selections, period: option}))}
                                                >
                                                    {formattedPeriod(option.name)}
                                            </OptionsButton>
                                        )
                                    }
                                </OptionsContainer>
                            </>
                        }
                    </ModalContainer>
                    <CloseContainer>
                        <OptionsButton
                            selected={false}
                            bg={"rgb(0,0,0,0)"}
                            color={"#2F2F2F"}
                            border={"rgb(0,0,0,0)"}
                            onClick={() => handleClose()}                       
                        >
                            Close &#x2715;
                        </OptionsButton>
                    </CloseContainer>
                </Overlay>
            
        );
    } else {
        return <></>;
    }
};

export default FilterModal;