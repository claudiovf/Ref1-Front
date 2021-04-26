import React from 'react';
import styled from 'styled-components';
import { formattedPeriod } from '../../utils/formatting';
import { Section, SelectionButton } from '../LayoutComponents';


const Container = styled(Section)`
    margin: 0.75rem 0 0.25rem 0;
    width: 100%;
    @media (min-width: 768px) {
        max-width: 30rem;
      }
`;
const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: "Work Sans Reg";
    font-size: 0.75rem;
    margin: 0.25rem 0.75rem;

`;

const SelButton = styled(SelectionButton)`
    padding: 0.5rem 0.75rem;
    margin: 0rem;
    @media (max-width: 330px) {
        padding: 0.25rem 0.5rem;
      }
`;
const Scratched = styled.div`
    color: #dadada;
    font-family: "Work Sans Reg";
    text-decoration: line-through;
    padding: 0.25rem 0.5rem;
    margin: 0rem;
    @media (max-width: 330px) {
        padding: 0.25rem 0.5rem;
      }
`;

interface Props {
    handleSessionSelection: (session: string) => void;
    sessionSelected: string;
    sessionsOver: string[];
}

const SessionSelection: React.FC<Props> = ({handleSessionSelection, sessionSelected, sessionsOver}: Props) => {

    const sessions = ["FP1", "FP2", "FP3", "qualifying", "race"];


    return (
        <React.Fragment>
            <Container>
                <Wrap>
                    {sessions.map(session => session === sessionSelected
                        ? <SelButton
                            key={session}
                            bg={"rgb(255, 255, 255, 0.1)"}
                            border={"rgb(0,0,0,0)"}
                            color={"#fff"}
                            selected={true}
                        >
                            {formattedPeriod(session)}
                        </SelButton>
                        : !sessionsOver.includes(session)
                            ? <SelButton
                                key={session}
                                bg={"rgb(0,0,0,0)"}
                                border={"rgb(0,0,0,0)"}
                                color={"#FFF"}
                                selected={false}
                                onClick={() => handleSessionSelection(session)}
                            >
                                {formattedPeriod(session)}
                            </SelButton>
                            : <Scratched key={session}>
                                {formattedPeriod(session)}
                            </Scratched>
                    )}
                </Wrap>
            </Container>
        </React.Fragment>
    );
};

export default SessionSelection;