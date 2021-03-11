import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Title } from '../LayoutComponents';

const overlayAnimation = keyframes`
    0% { opacity: 0;}
    100% { opacity: 1}
`;

const slideUpAnimation = keyframes`
    0% { opacity: 0;}
    65% { opacity: 0; top: 80%; }
    100% { opacity: 1}
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    animation-name: ${overlayAnimation};
    animation-duration: 0.8s;
`;

const ModalContainer = styled.div`
    width: 100.5%;
    height: 90vh;
    background-color: white;
    position:absolute;                        
    top: 56%;                        
    left: 50%;                        
    transform:translate(-50%,-50%);  
    border-radius:1rem 1rem 0 0;
    animation-name: ${slideUpAnimation};
    animation-duration: 0.5s;
`;

const SearchHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 3rem;
    width: 100%;
`;

const SearchTitle = styled(Title)`
    margin: 1rem;
    padding: 0;
`;
const Notif = styled(Title)`
    margin: 1rem;
    padding: 0;
    font-size: 1.25rem;
`;

const CloseX = styled.div`
    background-color: #D1DADC;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    text-align: center;
    line-height: 2rem;
    height: 2rem;
    width: 2rem;
    font-size: 1.5rem;
    margin: 1rem;
    border-radius: 50%;
`;

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}
const SearchModal: React.FC<Props> = ({ isOpen, handleClose}: Props) => {
    if (isOpen) {
        return (
            
                <Overlay>
                    <ModalContainer>
                        <SearchHeader>
                            <SearchTitle>Search</SearchTitle>
                            <CloseX onClick={handleClose}>&#x2715;</CloseX>
                        </SearchHeader>
                        <Notif>Coming Soon :)</Notif>
                    </ModalContainer>
                </Overlay>
            
        );
    } else {
        return <></>;
    }
};

export default SearchModal;