import React from 'react';
import styled from 'styled-components';
import { Team } from '../../types';
import { InfoBox, InfoRow, Label, Value } from '../LayoutComponents';

const GenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    min-height: auto;
    padding: 0.5rem;

    @media (min-width: 768px) {
        max-width: 30rem;
        padding: 3rem 0 3rem 3rem;
      }
`;

const Champ = styled(Value)`
      font-size: 2rem;
`;



const TeamInfo: React.FC<{ team: Team; }> = ( {team}: { team: Team } ) => {

    return (
        <React.Fragment>
            
            <GenContainer>
                <InfoRow>
                    <InfoBox>
                        <Value>{team.nationality}</Value>
                        <Label>Nationality</Label>
                    </InfoBox>
                </InfoRow>
                <InfoRow>
                    <InfoBox>
                        <Champ>{team.championships.length}</Champ>
                        <Label>Championships</Label>
                    </InfoBox>
                </InfoRow>
            </GenContainer>
        </React.Fragment>
    );
};

export default TeamInfo;