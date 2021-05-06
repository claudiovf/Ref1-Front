import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { SettingsState } from '../../../store/SettingsStore/settingsTypes';
import { Driver, DriverPeriod } from '../../../types';
import { getDriverStyle, invertStyle } from '../../../utils/currentInfo';
import PeriodButtons from './PeriodButtons';
import PeriodRaceStats from './PeriodRaceStats';
import PeriodStats from './PeriodStats';
import VsTeammates from './VsTeammates';


const StatGroupWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    height: auto;
    width: 100%;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
        align-items: top;
    }
`;
interface Props {
    driver: Driver;
}

const StatInfo: React.FC<Props> = ({ driver }: Props) => {
    const [ periodSelected, setPeriodSelected] = useState<string>("Career");
    const [ displayPeriod, setDisplayPeriod ] = useState<DriverPeriod | null>(null);

    const settings: SettingsState = useSelector((state: RootState) => state.settings);
    const driverStyle = invertStyle(settings.isDarkMode, getDriverStyle(driver.driverId));
    
    useEffect(() => {
        const periodToDisplay = driver.entries.find(p => p.period === periodSelected);
        if ( periodToDisplay ) {
            setDisplayPeriod(periodToDisplay);
        }
    }, [periodSelected, driver]);
    
    if ( !driver ) return null;



    const handlePeriodChange = (selected: string) => {
        setPeriodSelected(selected);
    };



    return (
        <React.Fragment>
                <PeriodButtons 
                    periods={driver.entries}
                    handlePeriodChange={handlePeriodChange}
                    style={driverStyle}
                    periodSelected={periodSelected}
                />

                {displayPeriod
                ? <>
                    <StatGroupWrap>
                        <PeriodStats 
                            displayPeriod={displayPeriod} 
                            driverStyle={driverStyle}
                        />
                        <VsTeammates 
                            displayPeriod={displayPeriod}
                            driverStyle={driverStyle}
                        />
                    </StatGroupWrap>
                    <PeriodRaceStats
                        displayPeriod={displayPeriod}
                        driverStyle={driverStyle}
                    />
                </>
                : null}
             
        </React.Fragment>
    );
};

export default StatInfo;
