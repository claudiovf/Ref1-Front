import React from 'react';
import styled from 'styled-components';
import { Team } from '../../types';
import { getDriverStyle } from '../../utils/currentInfo';
import { InfoBox, InfoRow, Label, Spacer, Value } from '../LayoutComponents';

const GenContainer = styled.div<{ bg: string }>`
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    min-height: auto;
    padding: 0.5rem;
`;


const ProfileName = styled.div<{ color: string}>`
    color: ${props => props.color};
    font-family: "Work Sans Extra Bold";
    align-text: center;
    font-size: 2rem;
    padding: 1.5rem 0 1rem 0;
    width: 100%;
`;




const TeamInfo: React.FC<{ team: Team; }> = ( {team}: { team: Team } ) => {
    const teamStyle = getDriverStyle(team.constructorId);

    return (
        <React.Fragment>
            
            <GenContainer bg={teamStyle.primary}>
                <Spacer />
                <ProfileName color={teamStyle.secondary}>
                    {teamStyle.team === "NA" ? team.name.toUpperCase() : teamStyle.team.toUpperCase()}</ProfileName>
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