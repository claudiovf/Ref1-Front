
import React from 'react';
import styled from 'styled-components';
import { getDriverStyle } from '../../utils/currentInfo';
import { formattedPeriod } from '../../utils/formatting';
import { Cards, StyledLink } from '../LayoutComponents';


const TeamName = styled.div<{ color: string;}>`
    color: ${props => props.color};
    font-family: "Work Sans Semi Bold";
    display: flex;
    flex-direction: row nowrap;
    justify-content: center;
    padding: 1rem;
    font-size: 1rem;
    min-width: 5rem;
    height: auto;
    white-space: nowrap;
`;

interface Props {
    team: string
}

const CurrentTeamCards: React.FC<Props> = ({team}: Props) => {
    const teamStyle = getDriverStyle(team);

    return (
        <>
            <StyledLink to={"/profile/team/" + team}>
                <Cards bg={teamStyle.primary}>
                    <TeamName color={teamStyle.secondary}>
                        {formattedPeriod(team)} </TeamName>
                </Cards>
            </StyledLink>
        </>
    );
};

export default CurrentTeamCards;