import React from 'react';
import styled from 'styled-components';
import { Team } from '../../types';
import { getDriverStyle } from '../../utils/currentInfo';
import { InfoBox, InfoRow, Label, Value } from '../LayoutComponents';

const GenContainer = styled.div<{ bg: string }>`
    background-color: ${props => props.bg};
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



const TeamInfo: React.FC<{ team: Team; }> = ( {team}: { team: Team } ) => {
    const teamStyle = getDriverStyle(team.constructorId);

    return (
        <React.Fragment>
            
            <GenContainer bg={teamStyle.primary}>
                <InfoRow>
                    <InfoBox>
                        <Value>{team.nationality}</Value>
                        <Label>Nationality</Label>
                    </InfoBox>
                </InfoRow>
                <InfoRow>
                    <InfoBox>
                        <Value>{team.championships.length}</Value>
                        <Label>Championships</Label>
                    </InfoBox>
                </InfoRow>
            </GenContainer>
        </React.Fragment>
    );
};

export default TeamInfo;