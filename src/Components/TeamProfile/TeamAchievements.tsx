import React from 'react';
import styled from 'styled-components';
import { Team } from '../../types';
import { Check } from '@styled-icons/bootstrap';

const AchieveContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;

    @media (min-width: 768px) {
        justify-content: flex-start;
        width: 20rem;
      }
`;

const Title = styled.div`
    width: 100%;
    padding-bottom: 0.25rem;
    font-size: 1rem;
`;

const AchieveCard = styled.div`
    background-color: rgb(255,255,255,0.1);
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    padding: 1rem;
    margin: 1.5rem;
    font-size: 0.75rem;
    font-family: "Work Sans Semi Bold";
    color: #FFFFFF;
    border-radius: 0.5rem;
    line-height: 1.5rem;

    @media (min-width: 768px) {
        padding: 1rem;
        margin: 3rem 0 0 2rem;
      }
`;

const CheckBoot = styled(Check)`
    margin-right: 0.5rem;
    color: rgb(255,255,255, 0.7);
`;


const TeamAchievements: React.FC<{team: Team}> = ({ team }: { team: Team }) => {
    const career = team.entries.find(p => p.period === "Career");

    if (!career ) return null;

    const wins = career.stats.find(s => s.stat === "wins");
    const podiums = career.stats.find(s => s.stat === "podiums");
    const pointsFinish = career.stats.find(s => s.stat === "pointsFinish");
    const entries = {stat: "entries", total: career.entries};

    if (!wins || !podiums || !pointsFinish) return null;


    const resultsAchievements = [wins, podiums, pointsFinish, entries].map(a => {
        switch(true) {
            case a.stat === 'wins':
                if (a.total >= 200) return '200+ Race Wins';
                else if (a.total >= 100) return '100+ Race Wins';
                else if (a.total >= 50) return '50+ Race Wins';
                else if (a.total >= 25) return '25+ Race Wins';
                else if (a.total > 0) return 'Race Winner';
                else return null;

            case a.stat === 'podiums':
                if (a.total >= 300) return '300+ Podium Finishes';
                else if (a.total >= 200) return '200+ Podium Finishes';
                else if (a.total >= 100) return '100+ Podium Finishes';
                else if (a.total >= 50) return '50+ Podium Finishes';
                else if (a.total >= 25) return '25+ Podium Finishes';
                else if (a.total > 0) return 'Podium Finish';
                else return null;

            case a.stat === 'pointsFinish':
                if (a.total >= 300) return '300+ Points Finishes';
                else if (a.total >= 200) return '200+ Points Finishes';
                else if (a.total >= 100) return '100+ Points Finishes';
                else if (a.total >= 50) return '50+ Points Finishes';
                else if (a.total >= 25) return '25+ Points Finishes';
                else if (a.total > 0) return 'Points Finish';
                else return null;

            case a.stat === 'entries':
                if (a.total >= 1000) return '1000+ Race Entries';
                else if (a.total >= 500) return '500+ Race Entries';
                else if (a.total >= 300) return '300+ Race Entries';
                else if (a.total >= 200) return '200+ Race Entries';
                else if (a.total >= 100) return '100+ Race Entries';
                else if (a.total >= 50) return '50+ Race Entries';
                else if (a.total >= 25) return '25+ Race Entries';
                else return null;
        }
    });

    if (resultsAchievements.filter(a => a !== null).length === 0) return null;

    return (
        <React.Fragment>
            <AchieveContainer>
                <AchieveCard>
                <Title>Achievements</Title>
                { team.championships.length > 0 
                    ? <div><CheckBoot size={28} /> World Champion</div>
                    : null
                }
                { resultsAchievements.map(a => a !== null 
                    ? <div key={a}><CheckBoot size={28} /> {a}</div>
                    : null
                )}
        
                </AchieveCard>
            </AchieveContainer>
        </React.Fragment>
    );
};

export default TeamAchievements;