import React, { useEffect, useState } from 'react';
import { Driver, DriverPeriod } from '../../../types';
import { getDriverStyle } from '../../../utils/currentInfo';
import PeriodButtons from './PeriodButtons';
import PeriodRaceStats from './PeriodRaceStats';
import PeriodStats from './PeriodStats';
import VsTeammates from './VsTeammates';



interface Props {
    driver: Driver;
}

const StatInfo: React.FC<Props> = ({ driver }: Props) => {
    const [ periodSelected, setPeriodSelected] = useState<string>("Career");
    const [ displayPeriod, setDisplayPeriod ] = useState<DriverPeriod | null>(null);
    const driverStyle = getDriverStyle(driver.driverId);
    
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
                    <PeriodStats 
                        displayPeriod={displayPeriod} 
                        driverStyle={driverStyle}
                    />
                    <VsTeammates 
                        displayPeriod={displayPeriod}
                        driverStyle={driverStyle}
                    />
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
