import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { eventGa } from '../../RouteTracker';
import { RootState } from '../../store';
import { setSearch, toggleOpen } from '../../store/actions';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { formattedStat } from '../../utils/formatting';
import { Section, Title, Scroll, CardsSlide, H2 } from '../LayoutComponents';


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


const ExploreTeams: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const stats = [
        'wins', 'podiums', 'pointsFinish', 'dnfs', 
    ];

    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <Section>  
                <Title darkMode={settings.isDarkMode}><H2>Explore Teams</H2></Title>
                <Scroll id="explore-teams-scroll">
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