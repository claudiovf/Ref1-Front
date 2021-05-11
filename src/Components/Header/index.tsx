import React, { useState } from 'react';
import {  StyledLink } from '../LayoutComponents';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from '../../store/actions';
import { eventGa } from '../../RouteTracker';
import { Settings } from '@styled-icons/fluentui-system-filled';
import { toggleSettingsOpen } from '../../store/SettingsStore/actions';
import { Search } from '@styled-icons/fluentui-system-filled';
import { Twitter } from '@styled-icons/bootstrap';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';

export const HeaderStyled = styled.div<{darkMode: boolean}>`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 3rem;
    max-height: 3rem;
    max-width: 100vw;
    width: 100%;
    position: fixed;
    // box-shadow: ${props => props.darkMode ? "0px 0.5px 1px #2f2f2f" : "0px 0.5px 1px #D1DADC" };
    background-color: ${props => props.darkMode ? "#1f1f1f" : "#FFF" };
    overflow: hidden;
    z-index: 1000;
`;


export const LogoStyled = styled.div<{darkMode: boolean}>`
    color: ${props => props.darkMode ? "#fff" : "#2f2f2f" };
    font-family: "Work Sans Bold";
    font-size: 1.25rem;
    cursor: pointer;
`;

const H1 = styled.h1`
  font-size: 1.25rem;
  margin: 0;
`;

const One = styled.span<{darkMode: boolean}>`
    color: ${props => props.darkMode ? "#00c49a" : "#00c49a" };
    font-family: "Work Sans Extra Bold";
`;

export const MagBox = styled.div<{darkMode: boolean}>`
    color: ${props => props.darkMode ? "rgb(255,255,255,0.9)" : "#2f2f2f" };
    cursor: pointer;
    @media (min-width: 768px) {
      &:hover {
          transform: scale(1.1);
        }
  }
`;
const Mag = styled.div`
  -webkit-transform: rotate(90deg); 
  -moz-transform: rotate(90deg); 
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.25rem;
  width: 4rem;
`;

const RightContainer = styled.div`
  width: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 1.25rem;
`;

const NewNotif = styled.span`
  background-color: #ff425c;
  font-family: "Work Sans Semi Bold";
  font-size: 10px;
  color: #FFF;
  padding: 0.15rem;
  border-radius: 5px;
  margin: -1.75rem 0 -0.75rem -0.5rem;
  z-index: 2000;
`;



const SettingsIcon = styled(Settings)<{ darkMode: boolean}>`
  color: ${props => props.darkMode ? "rgb(255,255,255,0.9)" : "#2f2f2f" };
  cursor: pointer;
  @media (min-width: 768px) {
      &:hover {
          transform: scale(1.1);
        }
  }
`;
const TwitterIcon = styled(Twitter)<{ darkMode: boolean}>`
  color: ${props => props.darkMode ? "rgb(255,255,255,0.9)" : "#2f2f2f" };
  cursor: pointer;
  @media (min-width: 768px) {
      &:hover {
          transform: scale(1.1);
        }
  }
`;

const SearchIcon = styled(Search)`
      padding: 0;
      margin: 0.5rem 0 ;
`;




const Header: React.FC = () => {
  const [notifSeen, setNotifSeen] = useState<boolean>(localStorage.getItem('notif') === 'viewed');

  const dispatch = useDispatch();
  const settings: SettingsState = useSelector((state: RootState) => state.settings);


  return (
      <React.Fragment>
        <HeaderStyled darkMode={settings.isDarkMode}> 

            <SettingsContainer>
              <SettingsIcon 
                darkMode={settings.isDarkMode}
                size={24} 
                onClick={ () => {
                  dispatch( toggleSettingsOpen() );
                  setNotifSeen(true);
                  localStorage.setItem('notif', 'viewed');
                }}
                />
                {
                  notifSeen ? null : <NewNotif>NEW</NewNotif>
                }
            </SettingsContainer>

            <StyledLink to={"/"}>
              <LogoStyled darkMode={settings.isDarkMode}>
                <H1>REF<One darkMode={settings.isDarkMode}>1</One></H1>
              </LogoStyled> 
            </StyledLink>

            <RightContainer>
              <TwitterIcon 
                  darkMode={settings.isDarkMode}
                  size={24} 
                  onClick={() => {
                    window.open("https://twitter.com/AppRef1", '_blank')?.focus();
                    eventGa("Twitter", 'Twitter', 'default');
                  }}/>
                  
              <MagBox 
                darkMode={settings.isDarkMode}
                onClick={ () => {
                  dispatch( toggleOpen() );
                  eventGa("HeaderSearch", 'default', 'default');
              }} ><Mag><SearchIcon size={24} /></Mag></MagBox> 
            </RightContainer>

        </HeaderStyled>
      </React.Fragment>
  );
};

export default Header;
