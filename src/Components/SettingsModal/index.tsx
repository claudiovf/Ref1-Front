import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { eventGa } from '../../RouteTracker';
import { RootState } from '../../store';
import { toggleSettingsOpen } from '../../store/SettingsStore/actions';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import Donate from './Donate';
import { Title } from '../LayoutComponents';
import FormatSelection from './FormatSelection';


const overlayAnimation = keyframes`
    0% { opacity: 0;}
    30% { opacity: 1}
    100% { opacity: 1}
`;
const overlayClosingAnimation = keyframes`
    0% { opacity: 1;}
    70% { opacity: 1}
    100% { opacity: 0}
`;

const slideUpAnimation = keyframes`
    0% { transform: translate(-50%, 100%)  }  
`;

const slideDownAnimation = keyframes`
    100% { transform: translate(-50%, 100%)  }
`;

const Overlay = styled.div<{ overlayClosing: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    animation-name: ${props => props.overlayClosing ? overlayClosingAnimation: overlayAnimation};
    animation-duration: 0.5s;
    z-index: 2000;
`;
const CloseOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
`;

const ModalContainer = styled.div<{ closing: boolean; darkMode: boolean; }>`
    background-color: ${props => props.darkMode ? "#3f3f3f" : "#FFF"};
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
    z-index: 3000;
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
    background-color: rgb(218, 226, 227, 0.5);
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

    const initialMode = localStorage.getItem('darkMode');

    

    const darkModeEvent = (initialMode: string | null, atClose: string | null): string | null => {
        if(initialMode !== atClose) {
            if (atClose === "On") return "Dark Mode ON";
            return "Dark Mode OFF";
        }
        return null;
    };

    const handleSettingsClose = () => {
        if (closing) return null;

        setClosing(true);
        setTimeout(() => {
            dispatch( toggleSettingsOpen() );
            setClosing(false);
        }, 500);
        eventGa("Preferences", 
            'Preferences',
            `${localStorage.getItem('temp') || 'Celsius'} 
            - ${localStorage.getItem('distUnit') || 'km'} 
            - ${localStorage.getItem('timeFormat') || '24hour'}`);
        
        if ( darkModeEvent(initialMode, localStorage.getItem('darkMode')) ) {
            eventGa("Preferences", `${darkModeEvent(initialMode, localStorage.getItem('darkMode'))}`, 'Dark Mode' );
        }
    };

    if (settings.isOpen) {
        return (
                <Overlay overlayClosing={closing}>
                    <CloseOverlay onClick={() => handleSettingsClose()}></CloseOverlay>
                    <ModalContainer closing={closing} darkMode={settings.isDarkMode}>
                        <Header>
                            <SearchTitle darkMode={settings.isDarkMode}> Settings </SearchTitle>
                            <CloseX onClick={() => handleSettingsClose()}> &#x2715; </CloseX>
                        </Header>
                        <SelectionContainer>
                            <FormatSelection 
                                title={"Dark Mode"}
                                defaultFormat={"Off"}
                                altFormat={"On"}
                                storageKey={'darkMode'}
                            />
                            <FormatSelection 
                                title={"Temperature"}
                                defaultFormat={"Celsius"}
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