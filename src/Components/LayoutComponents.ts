import styled, { createGlobalStyle, keyframes } from "styled-components";
import workSansBold from '../Assets/WorkSans/static/WorkSans-Bold.ttf';
import workSansSemiBold from '../Assets/WorkSans/static/WorkSans-SemiBold.ttf';
import workSansExtraBold from '../Assets/WorkSans/static/WorkSans-ExtraBold.ttf';
import workSansReg from '../Assets/WorkSans/static/WorkSans-Regular.ttf';
import { Link } from "react-router-dom";

// #24282E Raisin Black
// #D1DADC Light Gray
// #FFFFFF White 
// #388659 Sea Green
// #EF233C Imperial Red
// #6279B8 Glaucous

export const Fonts = createGlobalStyle`
    @font-face {
        font-family: "Work Sans Extra Bold";
        src: url(${workSansExtraBold}) format('truetype');
    }
    @font-face {
        font-family: "Work Sans Bold";
        src: url(${workSansBold}) format('truetype');
    }
    @font-face {
        font-family: "Work Sans Semi Bold";
        src: url(${workSansSemiBold}) format('truetype');
    }
    @font-face {
        font-family: "Work Sans Reg";
        src: url(${workSansReg}) format('truetype');
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
    // background-color: turquoise;
`;


export const Title = styled.div`
    // background-color: #EF435C;
    text-align: left;
    color: #2F2F2F;
    font-family: "Work Sans Bold";
    font-size: 1.5rem;
    padding: 1.25rem;
    padding-bottom: 0.25rem;
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
`;

export const popOutAnimation = keyframes`
    0% { opacity: 0;}
    65% { opacity: 0; margin-left: 5rem;}
    100% { opacity: 1}
`;

export const Cards = styled.div<{ bg: string}>`
    background-image: linear-gradient(rgba(255,255,255,0.15), ${props => props.bg}, ${props => props.bg});
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    margin: 0.25rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    animation-name: ${popOutAnimation};
    animation-duration: 1s;
`;

export const ProfileContainer = styled.div`
    animation-name: ${popOutAnimation};
    animation-duration: 1s;
    width: auto;
    overflow:visible;
`;


export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const StyledButton = styled.button`
    outline: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        outline: none;
    }
`;


export const BackHome = styled.div`
    font-family: "Work Sans Semi Bold";
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: #2E2E2E;
    background-color: #FFFFFF;
    font-size: 1rem;
    padding: 1rem 1rem;
    box-shadow: 0px 1px 1px #DDDDDD;
    position: fixed;
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
    font-family: "Work Sans Semi Bold";
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
    color: #bfc8c9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    padding: 0.25rem 0.5rem;
`;


// #24282E Raisin Black
// #D1DADC Light Gray
// #FFFFFF White 
// #388659 Sea Green
// #EF233C Imperial Red
// #6279B8 Glaucous
//#667dff purple
