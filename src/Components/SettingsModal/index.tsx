import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { eventGa } from '../../RouteTracker';
import { RootState } from '../../store';
import { toggleSettingsOpen } from '../../store/SettingsStore/actions';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import Donate from '../Donate';
import { Title } from '../LayoutComponents';
import FormatSelection from './FormatSelection';

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
    50% { opacity: 1; }
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
    background-color: white;
    width: 80%;
    max-width: 20rem;
    height: auto;
    position:absolute;                        
    top: 50%;                        
    left: 50%;                        
    transform:translate(-50%,-50%);  
    border-radius: 1rem;
    animation-name: ${props => props.closing ? slideDownAnimation : slideUpAnimation};
    animation-duration: 0.5s;
    @media (min-width: 768px) {
        max-width: 20rem;
        min-width: 20rem;
    }
`;


const Header = styled.div`
    
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

const SelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:0 0.5rem 1.5rem 0.5rem;
`;


const SettingsModal: React.FC = () => {
    const [closing, setClosing] = useState<boolean>(false);

    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();


    const handleSettingsClose = () => {
        setClosing(true);
        setTimeout(() => {
            dispatch( toggleSettingsOpen() );
            setClosing(false);
        }, 500);
        eventGa("Preferences", 
            'Preferences',
            `${localStorage.getItem('temp') || 'Celcius'} 
            - ${localStorage.getItem('distUnit') || 'km'} 
            - ${localStorage.getItem('timeFormat') || '24hour'}`);
    };

    if (settings.isOpen) {
        return (
                <Overlay overlayClosing={closing}>
                    <ModalContainer closing={closing}>
                        <Header>
                            <SearchTitle> Settings </SearchTitle>
                            <CloseX onClick={() => handleSettingsClose()}> &#x2715; </CloseX>
                        </Header>
                        <SelectionContainer>
                            <FormatSelection 
                                title={"Temperature"}
                                defaultFormat={"Celcius"}
                                altFormat={"Fahrenheit"}
                                storageKey={'temp'}
                            />
                            <FormatSelection 
                                title={"Distance Unit"}
                                defaultFormat={"Km"}
                                altFormat={"Miles"}
                                storageKey={'distUnit'}
                            />
                            <FormatSelection 
                                title={"Hour Format"}
                                defaultFormat={"24hour"}
                                altFormat={"ampm"}
                                storageKey={'timeFormat'}
                            />
                        </SelectionContainer>
                        <Donate />

                    </ModalContainer>
                </Overlay>
            
        );
    } else {
        return <></>;
    }
};

export default SettingsModal;