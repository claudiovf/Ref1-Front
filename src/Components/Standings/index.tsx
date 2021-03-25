import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSearch, toggleOpen } from '../../store/actions';
import { Section, Title, Scroll, popOutAnimation } from '../LayoutComponents';


const SearchCard = styled.div`
    font-family: "Work Sans Bold";
    background-color: #f44174;
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
`;

const StatTitle = styled.div`
    font-size: 1.25rem;
    color: #FFFFFF;
    margin-top: 1rem;
`;

const Standings: React.FC = () => {

    const seasons = [
        '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010' 
    ];

    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <Section>  
                <Title>Driver Standings</Title>
                <Scroll>
                    {
                        seasons.map(season => 
                            <SearchCard 
                                key={season}
                                onClick={() => {
                                    dispatch( setSearch({
                                        resultsFor: "drivers",
                                        sortBy: "points",
                                        filterBy: "Season",
                                        period: season
                                    }) );
                                    dispatch( toggleOpen() );
                                }}
                                >
                                    <StatTitle>{season}</StatTitle>
                                    <StatDescription>Driver Standings</StatDescription>
                            </SearchCard>)
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default Standings;