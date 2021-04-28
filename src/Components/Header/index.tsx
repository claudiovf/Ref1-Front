import React from 'react';
import {  StyledLink } from '../LayoutComponents';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { toggleOpen } from '../../store/actions';
import { eventGa } from '../../RouteTracker';
import { Settings } from '@styled-icons/fluentui-system-regular/Settings';
import { toggleSettingsOpen } from '../../store/SettingsStore/actions';

export const HeaderStyled = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 3rem;
    max-width: 100vw;
    width: 100%;
    position: fixed;
    box-shadow: 0px 0.5px 2px #D1DADC;
    background-color: #FFFFFF;
    overflow: hidden;
    z-index: 1000;
`;


export const LogoStyled = styled.div`
    background-color: #2F2F2F;
    color: #FFFFFF;
    font-family: "Work Sans Bold";
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    margin-left: 1.25rem;
    border-radius: 4px;
    cursor: pointer;
`;

export const MagBox = styled.div`
    background-color: #2F2F2F;
    color: #FFFFFF;
    // border: 1px solid #FF8700;
    font-family: "Work Sans Bold";
    font-size: 1.5rem;
    padding: 0 1.5rem;
    margin: 0.5rem;
    margin-right: 1.25rem;
    border-radius: 2rem;
    cursor: pointer;
    @media (min-width: 768px) {
      &:hover {
          transform: scale(1.1);
        }
  }
`;
const Mag = styled.div`
  -webkit-transform: rotate(45deg); 
  -moz-transform: rotate(45deg); 
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const SettingsIcon = styled(Settings)`
  color: #2f2f2f;
  cursor: pointer;
  @media (min-width: 768px) {
      &:hover {
          transform: scale(1.1);
        }
  }
`;


const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
      <React.Fragment>
        <HeaderStyled> 
          <StyledLink to={"/"}>
            <LogoStyled>REF1</LogoStyled> 
          </StyledLink>

          <RightItems>
            <SettingsContainer>
              <SettingsIcon 
                size={28} 
                onClick={ () => {
                  dispatch( toggleSettingsOpen() );
    
                }}
              />
            </SettingsContainer>
            <MagBox onClick={ () => {
              dispatch( toggleOpen() );
              eventGa("HeaderSearch", 'default', 'default');
            }} ><Mag>&#9906;</Mag></MagBox> 
          </RightItems>

        </HeaderStyled>
      </React.Fragment>
  );
};

export default Header;
