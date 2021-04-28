import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { CircuitType } from '../../types';
import { SectionTitle } from '../LayoutComponents';


const Tr = styled.tr`
//background-color: teal;
font-family: "Work Sans Semi Bold";
font-size: 1.75rem;
text-align: left;
height: auto;
vertical-align: bottom;
`;

const Label = styled.div`
    font-family: "Work Sans Semi Bold";
    color: #828282;;
    font-size: 0.75rem;
`;

const TdBorder = styled.td`
    border-left: 2px solid #00c49a;
    width: 2px;
`;
const TrSpacer = styled(Tr)`
    height: 1.5rem;
`;

const Table = styled.table`
    //background-color: tomato;
    width: 100%;
    padding: 1.25rem;
    ${Tr}:nth-child(2) {
        vertical-align: top;
        margin-bottom: 1rem;
    }
    ${Tr}:nth-child(4) {
        vertical-align: top;
    }

    @media (min-width: 768px) {
        max-width: 600px;
        min-width: 600px;
        padding: 0;
    }
`;

const Title = styled(SectionTitle)`
    padding: 0.75rem 0 0.25rem 0;
    vertical-align: bottom;
    text-align: left;
    font-size: 1.25rem;
    @media (min-width: 768px) {
        padding-bottom: 1rem;
    }
`;

const DriverName = styled.span`
    font-family: "Work Sans Reg";
    color: #2f2f2f;
    font-size: 0.75rem;
`;

interface Props {
    circuit: CircuitType;
}
export const distanceConverter = (distance: number): number => {
    return  distance * 0.621371 ;
};

const RaceInfo: React.FC<Props> = ({circuit}: Props ) => {
    
    const settings: SettingsState = useSelector((state: RootState) => state.settings);
  
    return (
        <React.Fragment>
            <Title color={"#2f2f2f"}>Circuit Information</Title>
            <Table>
                <tbody>
                    <Tr>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{circuit.laps}</td>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{settings.distance === 'k' ? circuit.length : (circuit.length * 0.621371).toFixed(3) }</td>
                    </Tr>
                    <Tr>
                        <td><Label>Laps</Label></td>
                        <td><Label>Length ({settings.distance === 'k' ? "Km" : "Miles" })</Label></td>
                    </Tr>
                    <TrSpacer></TrSpacer>
                    <Tr>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{circuit.firstGP}</td>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{settings.distance === 'k' ? circuit.raceDistance : (circuit.raceDistance * 0.621371).toFixed(3) }</td>
                    </Tr>
                    <Tr>
                        <td><Label>First Grand Prix</Label></td>
                        <td><Label>Race Distance ({settings.distance === 'k' ? "Km" : "Miles" })</Label></td>
                    </Tr>
                    {
                        circuit.lapRecord 
                        ? <>
                            <TrSpacer></TrSpacer>
                            <Tr >
                                <TdBorder rowSpan={2}></TdBorder>
                                <td colSpan={3}>{circuit.lapRecord.time} 
                                    <DriverName>
                                        &nbsp;{circuit.lapRecord.driver} ({circuit.lapRecord.season})
                                    </DriverName>
                                </td>
                            </Tr>
                            <Tr>
                                <td><Label>Lap Record</Label></td>
                            </Tr>
                        </>
                        : null
                    }
                </tbody>
            </Table>
        </React.Fragment>
        );
    };
    
    export default RaceInfo;