import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";


export const AppStyled = styled.div<{darkMode: boolean}>`
    -webkit-tap-highlight-color: transparent;
    text-align: center;
    margin: 0;
    overflow: visible;
    background-color: ${props => props.darkMode ? "#1f1f1f" : "none"};
    min-height: 100vh;
    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
`;


export const Spacer = styled.div`
    min-height: 3rem;
`;


export const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    height: auto;
    width: 100%;
    @media (min-width: 768px) {
        width: 80%;
        margin: 0;
        align-items: center;
      }
`;


export const Title = styled.div<{darkMode: boolean}>`
    // background-color: #EF435C;
    text-align: left;
    color: ${props => props.darkMode ? "rgb(255, 255, 255, 0.9)" : "#2F2F2F"};
    font-family: "Work Sans Bold";
    font-size: 1.25rem;
    padding: 1.25rem;
    padding-bottom: 0.25rem;
    @media (min-width: 768px) {
        padding-bottom: 1.25rem;
      }
`;

export const H1 = styled.h1`
    font-size: 2rem;
    margin: 0
`;
export const H2 = styled.h2`
    font-size: 1.25rem;
    margin: 0
`;

export const SectionTitle = styled.div<{ color: string; }>`
    text-align: left;
    font-family: "Work Sans Bold";
    color: ${props => props.color};
    font-size: 1rem;
    padding: 0.5rem 1.5rem 1rem 1.5rem;

`;


export const Scroll = styled.div`
    // background-color: tomato;
    display: flex;
    flex-flow: row nowrap;
    font-size: 1rem;
    padding: 0 0 0.25rem 1rem;
    overflow: auto;
    scroll-snap-type: x mandatory;

    @media (min-width: 768px) {
        flex-flow: row wrap;
        justify-content: center;
      }
`;

export const CardsSlide = keyframes`
    0% { opacity: 0; transform: scale(0.9, 0.9)}
    50% { opacity: 0; transform: scale(0.9, 0.9)}
    100% { opacity: 1}
`;
export const popOutAnimation = keyframes`
    0% { opacity: 0;}
    65% { opacity: 0; margin-left: 5rem; top: 0%;}
    100% { opacity: 1}
`;


export const slideUpAnimation = keyframes`
    0% { opacity: 0;}
    45% { opacity: 0; margin-top: 4rem;}
    85% { margin-top: -0.5rem;}
    100% { opacity: 1}
`;

export const Cards = styled.div<{ bg: string}>`
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    margin: 0.25rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    will-change: transform;
    animation-name: ${CardsSlide};
    animation-duration: 0.7s;
    cursor: pointer;

    @media (min-width: 768px) {
        max-width: 9rem;
        min-width: 9rem;
        &:hover {
            transform: scale(1.01);
          }
      }
`;

export const ProfileContainer = styled.div<{darkMode: boolean}>`
    animation-name: ${popOutAnimation};
    animation-duration: 1s;
    width: auto;
    overflow:visible;
    @media (min-width: 768px) {
        background-color: ${props => props.darkMode ? "#2f2f2f" : "#f0f0f0" };
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

      }
`;

export const ProfileName = styled.div<{ color: string}>`
    color: ${props => props.color};
    font-family: "Work Sans Extra Bold";
    align-text: center;
    font-size: 2rem;
    padding: 3.5rem 0 1rem 0;
    width: 100%;
`;

export const ProfileWrap = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;
      overflow: visible;

      @media (min-width: 960px) {
        width: 80%;
        align-self: center;
        max-width: 1200px;
        margin: 0 10% 0 10%;
      }
`;

export const GenAchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: top;
    justify-content: center;
    width: 100%;
    height: auto;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: flex-start;
      }
`;


export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const StyledButton = styled.button`
    -webkit-tap-highlight-color: transparent;
    outline: 0;

    &:focus, &:hover, &:visited, &:link, &:active {
        -webkit-tap-highlight-color: transparent;
        outline: 0;
    }
`;

export const SelectionButton = styled(StyledButton)<{ bg: string; color: string; selected: boolean; border: string}>`
    background-color: ${props => props.bg};
    color: ${props => props.color};
    border: 2px solid ${props => props.border};
    padding: 0.5rem 1rem;
    font-family: ${props => props.selected ? "Work Sans Bold" : "Work Sans Semi Bold" };
    margin: 0.25rem;
    white-space: nowrap;
    border-radius: 2rem;
    scroll-snap-align: center;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.05);
          }
    }
`;

export const BackHome = styled.div<{ darkMode: boolean}>`
    font-family: "Work Sans Semi Bold";
    max-height: 3rem;
    min-height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: ${props => props.darkMode ? "rgb(255,255,255, 0.9)" : "#2E2E2E" }; 
    background-color: ${props => props.darkMode ? "#1f1f1f" : "#FFFFFF" };
    font-size: 1rem;
    padding: 0 1rem;
    box-shadow: 0px 1px 1px ${props => props.darkMode ? "#3f3f3f" : "#EEE" };
    position: fixed;
    z-index: 1000;
`;

export const Period = styled.div`
    color: #888888;
`;

export const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0.25rem 0;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    padding: 0.5rem 1rem;
`;

export const Label = styled.div`
    font-family: "Arial";
    font-weight: 600;
    color: rgb(255,255,255,0.75);
    font-size: 0.75rem;
`;

export const Value = styled.div`
    font-family: "Work Sans Bold";
    color: #FFFFFF;
    font-size: 1rem;
    
`;

export const AchIcon = styled.span`
    color: rgb(255,255,255, 0.5);
    font-size: 1.5rem;
    padding: 0.5rem;
`;

export const Icon = styled.div`
    color: #b4bebf;
    display: flex;
    min-width: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    padding: 0.5rem 0.5rem 0.25rem 0.5rem;
`;

// #bfc8c9; ICON
// #24282E Raisin Black
// #D1DADC Light Gray
// #FFFFFF White 
// #388659 Sea Green
// #EF233C Imperial Red
// #6279B8 Glaucous
//#667dff purple
