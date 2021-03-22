
import React from 'react';
import styled from 'styled-components';
import { Team } from '../../types';
import { getDriverStyle } from '../../utils/currentInfo';
import { Cards, StyledLink } from '../LayoutComponents';


const TeamName = styled.div<{ color: string;}>`
    color: ${props => props.color};
    font-family: "Work Sans Semi Bold";
    display: flex;
    flex-direction: row nowrap;
    padding: 1rem;
    font-size: 1rem;
    width: auto;
    height: auto;
    white-space: nowrap;
`;



const CurrentTeamCards: React.FC<{ team: Team }> = ({team}: {team: Team}) => {
    const teamStyle = getDriverStyle(team.constructorId);

    return (
        <>
            <StyledLink to={"/profile/team/" + team.constructorId}>
                <Cards bg={teamStyle.primary}>
                    <TeamName color={teamStyle.secondary}>
                        {team.name} </TeamName>
                </Cards>
            </StyledLink>
        </>
    );
};

export default CurrentTeamCards;