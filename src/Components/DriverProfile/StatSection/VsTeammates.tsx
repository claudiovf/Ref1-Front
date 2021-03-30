import React from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, DriverPeriod } from '../../../types';
import { InfoRow, InfoBox, Value, Label, SectionTitle } from '../../LayoutComponents';


const StatsContainer = styled.div<{ bg: string }>`
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: center;
    width: 100%;

    @media (min-width: 768px) {
        padding-top: 1rem;
        padding-right: 2.5rem;
      }
`;

const TopStats = styled.div`
    background-color: rgb(255,255,255);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0rem 1.5rem 1.5rem 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
`;

const DarkValue = styled(Value)`
    font-size: 1.25rem;
    color: #2F2F2F;
`;

const DarkLabel = styled(Label)`
    color: #AFAFAF;
    font-size: 0.75rem;
`;



const CenterInfoBox = styled(InfoBox)`
    min-width: 5rem;
`;


const PctBarIncrement = styled.div<{ bginc: boolean }>`
    background-color: ${props => props.bginc ? "#2F2F2F" : "#DFDFDF"};
    min-width: 0.175rem;
    min-height: 0.2rem;
    display: block;
`;



interface Props {
    displayPeriod: DriverPeriod;
    driverStyle: CurrTeamStyles;
}
const VsTeammates: React.FC<Props> = ({ displayPeriod, driverStyle }: Props) => {
    const incArr: { key: number; pct: boolean }[] = [];

    for (let i = 0; i < 100; i++) {
        if(i <= Number(displayPeriod.vsTeammates.pctAhead.toFixed(0))) {
            incArr.push({key: i, pct: true});
        }else{
            incArr.push({key: i, pct: false});
        }
        
    }
   
    return (
        <React.Fragment>
            <StatsContainer bg={driverStyle.primary}>
                <SectionTitle color={driverStyle.secondary} >Teammates Comparison</SectionTitle>
                <TopStats>
                        <InfoRow>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.vsTeammates.driverAhead}</DarkValue>
                                <DarkLabel>Driver Ahead</DarkLabel>
                            </CenterInfoBox>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.vsTeammates.teammatesAhead}</DarkValue>
                                <DarkLabel>Teammates Ahead</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>
                        <InfoRow>
                                {incArr.map(inc => <PctBarIncrement bginc={inc.pct} key={inc.key}> </PctBarIncrement>)}
                        </InfoRow>
                        <InfoRow>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.vsTeammates.pctAhead}</DarkValue>
                                <DarkLabel>Driver Percentage Ahead</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>
                </TopStats>
            </StatsContainer>
        </React.Fragment>
    );

};

export default VsTeammates;