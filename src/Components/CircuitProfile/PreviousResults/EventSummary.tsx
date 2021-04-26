import React from 'react';
import styled from 'styled-components';
import { CircuitEvent } from '../../../types';
import { SectionTitle } from '../../LayoutComponents';

const Container = styled.div`
    width: 100%;
    height: auto;
    //background-color: tomato;
`;

const SummaryWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    //background-color:blue;
    width: auto;
    height: auto;
    max-width: 100vw;
    margin: 0.5rem 0.5rem 2rem 0.5rem;
    @media (min-width: 960px) {
        margin: 0.5rem 0.5rem 2rem 0.5rem;
      }
`;
const EventName = styled(SectionTitle)`
    padding: 0.25rem 0 0.25rem 0;
    vertical-align: bottom;
    text-align: left;
    font-size: 1rem;
    //background-color: green;
`;
const EventDate = styled(SectionTitle)`
    padding: 0.25rem 0 0.25rem 0;
    vertical-align: bottom;
    text-align: left;
    font-size: 0.75rem;
    //background-color: green;
`;

interface Props {
    displayEvent: CircuitEvent;
}

const EventSummary: React.FC<Props> = ({displayEvent}: Props) => {

    return (
        <React.Fragment>
            <Container>
                <SummaryWrap>
                    <EventName color={"#00c49a"}>{displayEvent.season} {displayEvent.raceName}</EventName>
                    <EventDate color={"#828282"}>{new Date(displayEvent.date).toDateString()}</EventDate>
 
                </SummaryWrap>
            </Container>
        </React.Fragment>
    );
};

export default EventSummary;