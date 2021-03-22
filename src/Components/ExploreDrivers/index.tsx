import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSearch, toggleOpen } from '../../store/actions';
import { formattedStat } from '../../utils/formatting';
import { Section, Title, Scroll, popOutAnimation } from '../LayoutComponents';


const SearchCard = styled.div`
    font-family: "Work Sans Bold";
    background-color: #262a4d;
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
`;

const StatDescription = styled.div`
    font-size: 0.75rem;
    font-family: "Work Sans Semi Bold";
    color: #FFFFFF;
    margin-top: 1rem;
`;

const StatTitle = styled.div`
    font-size: 1.25rem;
    color: #FFFFFF;
`;

const ExploreDrivers: React.FC = () => {

    const stats = [
        'wins', 'podiums', 'pointsFinish', 'dnfs', 
    ];

    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <Section>  
                <Title>Explore Drivers</Title>
                <Scroll>
                    {
                        stats.map(stat => 
                            <SearchCard 
                                key={stat}
                                onClick={() => {
                                    dispatch( setSearch({
                                        resultsFor: "drivers",
                                        sortBy: stat,
                                        filterBy: "All Time",
                                        period: "All Time"
                                    }) );
                                    dispatch( toggleOpen() );
                                }}
                                >
                                    <StatDescription>Career</StatDescription>
                                    <StatTitle>{formattedStat(stat)}</StatTitle>
                            </SearchCard>)
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default ExploreDrivers;