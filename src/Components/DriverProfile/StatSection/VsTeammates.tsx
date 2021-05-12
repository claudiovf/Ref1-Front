import React from 'react';
import styled from 'styled-components';
import { CurrTeamStyles, DriverPeriod } from '../../../types';
import { InfoRow, InfoBox, Value, Label, SectionTitle, Icon } from '../../LayoutComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SettingsState } from '../../../store/SettingsStore/settingsTypes';
import Icons from '../../Icons/Icons';

const StatsContainer = styled.div`
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

const DarkValue = styled(Value)`
    font-size: 1.25rem;
`;

const DarkLabel = styled(Label)`
    font-size: 0.75rem;
`;

const CenterInfoBox = styled(InfoBox)`
    min-width: 5rem;
    margin: 0;
    padding: 0.25rem 0.5rem 0.25rem 0;
`;


const PctBarIncrement = styled.div<{ bginc: boolean; darkMode: boolean }>`
      ${props => props.darkMode 
        ? `background-color: ${props.bginc ? "rgb(255,255,255, 0.9)" : "rgb(255,255,255, 0.1)"};`
        : `background-color: ${props.bginc ? "#2F2F2F" : "#DFDFDF"};`}
    min-width: 1%;
    min-height: 0.2rem;
    display: block;
`;

const IconTeammate = styled(Icon)`
      padding: 0.25rem 0.25rem 0 0;
      margin: 0;
`;

const TopStats = styled.div<{darkMode: boolean}>`
    background-color: ${props => props.darkMode ? "rgb(255,255,255,0.1)" : "#FFF"};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0rem 1.5rem 1.5rem 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;

    ${DarkValue} {
        color: ${props => props.darkMode ? "rgb(255,255,255, 0.9)" : "#2F2F2F" };
    }
    ${DarkLabel} {
        color: ${props => props.darkMode ? "rgb(255,255,255, 0.5)" : "#a2a2a2" };
    }
`;

const Pct = styled.span`
    font-family: "Work Sans Semi Bold";
    font-size: 1.5rem;
`;


interface Props {
    displayPeriod: DriverPeriod;
    driverStyle: CurrTeamStyles;
}
const VsTeammates: React.FC<Props> = ({ displayPeriod, driverStyle }: Props) => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

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
            <StatsContainer>
                <SectionTitle color={driverStyle.secondary} >Teammates Comparison</SectionTitle>
                <TopStats darkMode={settings.isDarkMode}>
                        <InfoRow>
                            <IconTeammate>
                                <Icons 
                                    color={"#b4bebf"} 
                                    size={"32"}
                                    iconType={"ArrowUp"}
                                />
                            </IconTeammate>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.vsTeammates.driverAhead}</DarkValue>
                                <DarkLabel>Driver Ahead</DarkLabel>
                            </CenterInfoBox>
                            <IconTeammate>
                                <Icons 
                                    color={"#b4bebf"} 
                                    size={"32"}
                                    iconType={"ArrowDown"}
                                />
                            </IconTeammate>
                            <CenterInfoBox>
                                <DarkValue>{displayPeriod.vsTeammates.teammatesAhead}</DarkValue>
                                <DarkLabel>Teammates Ahead</DarkLabel>
                            </CenterInfoBox>
                        </InfoRow>
                        <InfoRow>
                                {incArr.map(inc => 
                                    <PctBarIncrement 
                                        bginc={inc.pct} 
                                        darkMode={settings.isDarkMode}
                                        key={inc.key}> </PctBarIncrement>)}
                        </InfoRow>
                        <InfoRow>
                            <IconTeammate><Pct>%</Pct></IconTeammate>
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