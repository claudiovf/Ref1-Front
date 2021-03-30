import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { eventGa } from '../../RouteTracker';
import { setSearch, toggleOpen } from '../../store/actions';
import { formattedStat } from '../../utils/formatting';
import { Section, Title, Scroll, popOutAnimation } from '../LayoutComponents';


const SearchCard = styled.div`
    font-family: "Work Sans Bold";
    background-color: #7765e3;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    min-width: 12.8rem;
    height: 8rem;
    margin: 0.25rem;
    padding: 1rem;
    border-radius: 0.5rem;
    animation-name: ${popOutAnimation};
    animation-duration: 1s;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.05);
          }
    }
`;

const StatDescription = styled.div`
    font-size: 0.75rem;
    font-family: "Work Sans Semi Bold";
    color: #FFFFFF;
`;

const StatTitle = styled.div`
    font-size: 1.25rem;
    color: #FFFFFF;
    margin-top: 1rem;
`;

const ExploreTeams: React.FC = () => {

    const stats = [
        'wins', 'podiums', 'pointsFinish', 'dnfs', 
    ];

    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <Section>  
                <Title>Explore Teams</Title>
                <Scroll>
                    {
                        stats.map(stat => 
                            <SearchCard 
                                key={stat + "1"}
                                onClick={() => {
                                    dispatch( setSearch({
                                        resultsFor: "teams",
                                        sortBy: stat,
                                        filterBy: "All Time",
                                        period: "All Time"
                                    }) );
                                    dispatch( toggleOpen() );
                                    eventGa("ExploreTeams", `Teams - ${stat} - Period: All Time`, 'Teams');
                                }}
                                >
                                    <StatTitle>{formattedStat(stat)}</StatTitle>
                                    <StatDescription>All Time - Teams</StatDescription>
                            </SearchCard>)
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default ExploreTeams;