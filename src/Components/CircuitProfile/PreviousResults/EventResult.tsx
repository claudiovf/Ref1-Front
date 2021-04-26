import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GET_EVENT_RESULTS } from '../../../queries';
import { CircuitEvent, CircuitPos } from '../../../types';
import Spinner from '../../Common/Spinner';
import { StyledLink, SelectionButton } from '../../LayoutComponents';

const Container = styled.div`
    width: 100%;
    height: auto;
    //background-color: tomato;
`;
const SpinnerContainer = styled.div`
    width: 100%;
    min-height: 80vh;
`;

const SummaryWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    height: auto;
    max-width: 100vw;
    margin:  0 1.25rem;
`;
const Table = styled.table`
    font-family: "Work Sans Semi Bold";
    padding: 0.25rem 0 0.25rem 0;
    vertical-align: bottom;
    text-align: left;
    font-size: 1rem;
    width: 100%;

    @media (min-width: 768px) {
        max-width: 600px;
        min-width: 600px;
        padding: 0;
    }
`;

const TdName = styled.td`
    color: #2f2f2f;
`;
const TdTeam = styled.td`
    font-size: 0.75rem;
    color: #00c49a;
    padding: 0rem 0 1.5rem 0;
`;
const StyledLinkDriver = styled(StyledLink)`
    color: #2f2f2f;
    font-family: "Work Sans Bold";
`;
const StyledLinkTeam = styled(StyledLink)`
    color: #00c49a;
    font-family: "Work Sans Reg";
`;

const Tr = styled.tr`
    td:first-child {
        width: 2rem;
        color: #2f2f2f;
        font-family: "Work Sans Bold";
        font-size: 1rem;
    }
    td:nth-child(3) {
        text-align: right;
        font-family: "Work Sans Reg";
        font-size: 0.75rem;
        color: #2f2f2f;
    }
`;

const ResultButton = styled(SelectionButton)`
    margin: 0;
    padding: 0.25rem 1rem;
    font-size: 1rem;
`;
const ResultButtonTeam = styled(SelectionButton)`
    margin: 0;
    padding: 0.25rem 1rem;
    font-size: 0.75rem;
`;

interface Props {
    displayEvent: CircuitEvent;
}

const EventResult: React.FC<Props> = ({displayEvent}: Props) => {
    const [ result, setResult ] = useState<CircuitPos[] | null>(null);

    const { loading, data } = useQuery<{ getCircuitResults: CircuitEvent }>(GET_EVENT_RESULTS, {
        fetchPolicy: "cache-and-network", 
        variables: { season: displayEvent.season, round: displayEvent.round } 
    });
    
    useEffect(() => {
        if (data) {
           setResult([...data.getCircuitResults.results].sort((a,b) => Number(a.position) - Number(b.position)));
        }
    }, [data]);

    if (loading) return <SpinnerContainer><Spinner /> </SpinnerContainer>;
    if (!data) return null;

    return (
        <React.Fragment>
            <Container>
                <SummaryWrap>
                    <Table>
                            {result?.map(pos =>
                                <tbody key={pos.position}>
                                    <Tr>
                                        <td>{pos.position}</td>
                                        <TdName>
                                            <StyledLinkDriver to={"/profile/driver/" + pos.Driver.driverId}>
                                                <ResultButton
                                                    color={"#2f2f2f"}
                                                    bg={"rgb(47, 47, 47,0.05)"}
                                                    border={"rgb(0,0,0,0)"}
                                                    selected={true}
                                                >
                                                    {pos.Driver.givenName} {pos.Driver.familyName}
                                                </ResultButton>
                                            </StyledLinkDriver>    
                                        </TdName>
                                        <td>{pos.Time ? pos.Time.time : pos.status}</td>
                                    </Tr>
                                    <Tr>
                                        <td></td>
                                        <TdTeam>
                                            <StyledLinkTeam to={"/profile/team/" + pos.Constructor.constructorId}>
                                                <ResultButtonTeam
                                                    color={"#00c49a"}
                                                    bg={"rgb(0, 196, 154, 0.2)"}
                                                    border={"rgb(0,0,0,0)"}
                                                    selected={true}
                                                >
                                                    {pos.Constructor.name}
                                                </ResultButtonTeam>
                                            </StyledLinkTeam>
                                        </TdTeam>
                                        <td></td>
                                    </Tr>
                                </tbody>
                            )}
                    </Table>
 
                </SummaryWrap>
            </Container>
        </React.Fragment>
    );
};

export default EventResult;