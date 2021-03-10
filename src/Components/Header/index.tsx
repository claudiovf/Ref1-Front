import React from 'react';
import { Fonts, StyledLink } from '../LayoutComponents';
import styled from "styled-components";

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
`;
const Mag = styled.div`
  -webkit-transform: rotate(45deg); 
  -moz-transform: rotate(45deg); 
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
`;

interface Props {
  handleOpenSearch: () => void; 
}

const Header: React.FC<Props> = ({handleOpenSearch}: Props) => {

  return (
      <React.Fragment>
        <HeaderStyled> 
          <Fonts />
          <StyledLink to={"/"}>
            <LogoStyled>REF1</LogoStyled> 
          </StyledLink>
            <MagBox onClick={handleOpenSearch} ><Mag>&#9906;</Mag></MagBox> 
        </HeaderStyled>
      </React.Fragment>
  );
};

export default Header;
