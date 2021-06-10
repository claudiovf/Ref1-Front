import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { eventGa } from '../../RouteTracker';
import { RootState } from '../../store';
import { setSearch, toggleOpen } from '../../store/actions';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { Section, Title, Scroll, CardsSlide, H2 } from '../LayoutComponents';


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
    animation-name: ${CardsSlide};
    animation-duration: 0.5s;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.02);
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


const Standings: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const dispatch = useDispatch();

    const handleSelection = (type: string) => {
        dispatch( setSearch({
            resultsFor: type,
            sortBy: "points",
            filterBy: "Season",
            period: "2021"
        }) );
        dispatch( toggleOpen() );
        eventGa("Standings", `${type} - points - Period: 2021`, `${type}`);
    };


    return (
        <React.Fragment>
            <Section>  
                <Title darkMode={settings.isDarkMode}><H2>2021 Standings</H2></Title>
                <Scroll id="standings-scroll">
                    {
                        ["drivers", "teams"].map(type => 
                            <SearchCard 
                                key={type}
                                onClick={() => handleSelection(type)}
                                >
                                    <StatTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</StatTitle>
                                    <StatDescription>Standings</StatDescription>
                            </SearchCard>)
                    }
                </Scroll>
            </Section>
        </React.Fragment>
    );
};

export default Standings;