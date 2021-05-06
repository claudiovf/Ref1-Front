import React, { useEffect, useState } from 'react';
import { Team, TeamPeriod } from '../../../types';
import { getDriverStyle, invertStyle } from '../../../utils/currentInfo';
import TeamPeriodButtons from './TeamPeriodButtons';
import TeamPeriodStats from './TeamPeriodStats';
import TeamPeriodRaceStats from './TeamPeriodRaceStats';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SettingsState } from '../../../store/SettingsStore/settingsTypes';


interface Props {
    team: Team;
}

const TeamStatInfo: React.FC<Props> = ({ team }: Props) => {
    const [ periodSelected, setPeriodSelected] = useState<string>("All Time");
    const [ displayPeriod, setDisplayPeriod ] = useState<TeamPeriod | null>(null);

    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    const teamStyle = invertStyle(settings.isDarkMode, getDriverStyle(team.constructorId));
    
    useEffect(() => {
        const correctedPeriod = (period: string): string => period === 'All Time' ? 'Career' : period;

        const periodToDisplay = team.entries.find(p => p.period === correctedPeriod(periodSelected));
        if ( periodToDisplay ) {
            setDisplayPeriod(periodToDisplay);
        }
    }, [periodSelected, team]);
    
    if ( !team ) return null;



    const handlePeriodChange = (selected: string) => {

        setPeriodSelected(selected);
    };



    return (
        <React.Fragment>
                <TeamPeriodButtons 
                    periods={team.entries}
                    handlePeriodChange={handlePeriodChange}
                    style={teamStyle}
                    periodSelected={periodSelected}
                />
                
                {displayPeriod
                ? <TeamPeriodStats 
                        displayPeriod={displayPeriod} 
                        teamStyle={teamStyle}
                    />  
                : null}

                {displayPeriod
                ? <TeamPeriodRaceStats
                    displayPeriod={displayPeriod}
                    teamStyle={teamStyle}
                />
                : null}
        </React.Fragment>
    );
};

export default TeamStatInfo;
