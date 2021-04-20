import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Title } from '../LayoutComponents';
import { RootState } from '../../store';
import { SearchState } from '../../store/searchTypes';
import { setSearch, toggleOpen, setCurrResults, setPrevResults } from '../../store/actions';
import FilterBy from './FilterBy';
import SortBy from './SortBy';
import ResutsFor from './ResultsFor';
// import { useQuery } from '@apollo/client';
// import { GET_TEAM_NAMES } from '../../queries';
// import { Team } from '../../types';
import TeamResults from './TeamResults';
import DriverResults from './DriverResults';

const overlayAnimation = keyframes`
    0% { opacity: 0;}
    100% { opacity: 1}
`;
const overlayClosingAnimation = keyframes`
    0% { opacity: 1;}
    50% { opacity: 1}
    100% { opacity: 0}
`;

const slideUpAnimation = keyframes`
    0% { opacity: 0;}
    50% { opacity: 0; top: 90%; }
    100% { opacity: 1}
`;

const slideDownAnimation = keyframes`
    0% { opacity: 1;}
    50% { opacity: 1; top: 56%;  }
    100% { opacity: 0; top: 100%;  }
`;



const Overlay = styled.div<{ overlayClosing: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    animation-name: ${props => props.overlayClosing ? overlayClosingAnimation: overlayAnimation};
    animation-duration: 0.6s;
    z-index: 2000;
`;

const ModalContainer = styled.div<{ closing: boolean }>`
    min-width: 100vw;
    height: 100vh;
    position:absolute;                        
    top: 56%;                        
    left: 50%;                        
    transform:translate(-50%,-50%);  
    border-radius:1rem 1rem 0 0;
    animation-name: ${props => props.closing ? slideDownAnimation : slideUpAnimation};
    animation-duration: 0.5s;
    @media (min-width: 768px) {
        max-width: 40rem;
        min-width: 40rem;
        min-height: 100vh;
        margin: 0;
        overflow: hidden;
    }
`;

const ModalOverflow = styled.div`
    width: 100vw;
    height: 100%;
    position:absolute;             
    top: 50%;                        
    left: 50%;                        
    transform:translate(-50%,-50%);  
    background-color: white;          
    border-radius:1rem 1rem 0 0;
    overflow-y:  auto;

    @media (min-width: 768px) {
        width: 40rem;
        height: 100%;
        min-height: 100vh;
        margin-top: 0;
    }
`;


const SearchHeader = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media (min-width: 768px) {
        margin-top: 1rem;
    }
`;

const SearchTitle = styled(Title)`
    margin: 0 0.75rem;
    padding: 0 0.5rem;
`;

const CloseX = styled.div`
    background-color: #e4eced;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    text-align: center;
    line-height: 2rem;
    height: 2rem;
    width: 2rem;
    font-size: 1rem;
    margin: 1rem;
    border-radius: 50%;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.1);
          }
    }
`;


const SearchModal: React.FC = () => {
    const [closing, setClosing] = useState<boolean>(false);

    const search: SearchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();


    const handleSearchClose = () => {
        setClosing(true);
        setTimeout(() => {
            dispatch( setSearch({}) );
            dispatch( setCurrResults([]) );
            dispatch( setPrevResults([]) );
            dispatch( toggleOpen() );
            setClosing(false);
        }, 600);
    };

    if (search.isOpen) {
        return (
                <Overlay overlayClosing={closing}>
                    <ModalContainer closing={closing}>
                        <ModalOverflow>
                            <SearchHeader>
                                <SearchTitle>Search</SearchTitle>
                                <CloseX onClick={() => handleSearchClose()}>&#x2715;</CloseX>
                            </SearchHeader>

                            <ResutsFor />
                            <SortBy />
                            <FilterBy />
                            {
                                search.selections.resultsFor 
                                && search.selections.sortBy
                                && search.selections.filterBy
                                && search.selections.period
                                    ? search.selections.resultsFor === "drivers" 
                                        ? <DriverResults />
                                        : <TeamResults />
                                    : null
                            }
                        </ModalOverflow>
                        
                    </ModalContainer>
                </Overlay>
            
        );
    } else {
        return <></>;
    }
};

export default SearchModal;