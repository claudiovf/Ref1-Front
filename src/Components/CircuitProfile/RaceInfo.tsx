import React from 'react';
import styled from 'styled-components';
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
`;

const DriverName = styled.span`
    font-family: "Work Sans Reg";
    color: #2f2f2f;
    font-size: 0.75rem;
`;

interface Props {
    circuit: CircuitType;
}

const RaceInfo: React.FC<Props> = ({circuit}: Props ) => {

    return (
        <React.Fragment>
            <Title color={"#2f2f2f"}>Circuit Information</Title>
            <Table>
                <tbody>
                    <Tr>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{circuit.laps}</td>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{circuit.length}</td>
                    </Tr>
                    <Tr>
                        <td><Label>Laps</Label></td>
                        <td><Label>Length (Km)</Label></td>
                    </Tr>
                    <TrSpacer></TrSpacer>
                    <Tr>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{circuit.firstGP}</td>
                        <TdBorder rowSpan={2}></TdBorder>
                        <td>{circuit.raceDistance}</td>
                    </Tr>
                    <Tr>
                        <td><Label>First Grand Prix</Label></td>
                        <td><Label>Race Distance (Km)</Label></td>
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