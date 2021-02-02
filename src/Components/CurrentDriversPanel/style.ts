import styled from "styled-components";
import workSansBold from '../../Assets/WorkSans/static/WorkSans-Bold.ttf';
import workSansReg from '../../Assets/WorkSans/static/WorkSans-Regular.ttf';

export const Spacer = styled.div`
    min-height: 3rem;
    background-color: tomato;
`;

export const Section = styled.div`

    @font-face {
        font-family: "Work Sans Bold";
        src: url(${workSansBold}) format('truetype');
    }
    @font-face {
        font-family: "Work Sans Reg";
        src: url(${workSansReg}) format('truetype');
    }

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
    color: #000000;
    font-family: "Work Sans Bold";
    font-size: 1rem;
    padding: 1rem;
    padding-bottom: 0;
`;

export const Scroll = styled.div`
    // background-color: tomato;
    display: flex;
    flex-flow: row nowrap;
    font-size: 1rem;
    padding: 0.5rem;
    overflow: auto;
`;




// #24282E Raisin Black
// #D1DADC Light Gray
// #FFFFFF White 
// #388659 Sea Green
// #EF233C Imperial Red
// #6279B8 Glaucous
