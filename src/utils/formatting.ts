import { TeamNameId } from "../store/searchTypes";
import { DisplaySchedule, DriverResult, Schedule, TeamResult } from "../types";
import { getDriverStyle, patchId } from "./currentInfo";



export const isDark = (stat: string): boolean => {
    if ( stat === "wins" || stat === "pointsFinish" || stat === "entries") return false;
    else return true;
};

export const formattedPeriod = (teamName: string): string => {
    if (teamName === "alfa") return "Alfa Romeo";
    return teamName.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

export const formattedDate = (date: string): string => {
    const splitDate = date.split("-");

    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
};

export const getPeriod = (statePeriod: TeamNameId | string): string => 
    typeof statePeriod === "string" 
        ? statePeriod === "All Time" ? "Career" : statePeriod 
        : statePeriod.constructorId;


interface SplitStat {
    stat: string; 
    isPct: boolean; 
    isPeriodLevel: boolean;
}
export const splitStat = (stateStat: string): SplitStat => {
    const split = stateStat.split("_");
    if (split.length === 1 && !["wins", "podiums", "pointsFinish", "dnfs"].includes(split[0])) {
        return { stat: stateStat, isPeriodLevel: true, isPct: false};
    }
    else if (split.length === 1) return { stat: stateStat, isPeriodLevel: false, isPct: false};

    else return { stat: split[0], isPeriodLevel: false, isPct: true };
};


export const getDisplayStat = (obj: DriverResult | TeamResult, splitStat: SplitStat): number | null => {
        
    if (splitStat.isPct) return Number(obj.reqRaceStat.pct.toFixed(2));

    else if (!splitStat.isPct && !splitStat.isPeriodLevel) return obj.reqRaceStat.total;
    
    switch(true) {
        case splitStat.stat === "points":
            return obj.reqEntry.points;
        case splitStat.stat === "avgPoints":
            return obj.reqEntry.avgPoints;
        case splitStat.stat === "avgPosition":
            return obj.reqEntry.avgPosition;
        case splitStat.stat === "entries":
            return obj.reqEntry.entries;
        default:
            return null;
    }
};

export const getSecondSort = (splitStat: SplitStat): string | null => {

    switch(true) {
        case splitStat.stat === "points":
            return  "Best Result";

        case splitStat.stat === "entries":
            return null;

        default:
            return "Entries";
    }
};



export const resultItemStyle = (id: string, givenName: string | null): string => {
    return getDriverStyle(patchId(id, givenName)).team === "NA" 
    ? "rgb(235,235,235, 0.9)" 
    : getDriverStyle(patchId(id, givenName)).primary;
}; 

export const formattedStat = (stat: string): string => {
    switch(stat) {
        case "wins":
            return "Most Wins";

        case "wins_pct":
            return "% Wins";

        case "podiums":
            return "Most Podiums";

        case "podiums_pct":
            return "% Podiums";

        case "entries":
            return "Most Entries";

        case "avgPoints":
            return "Average Points";

        case "points":
            return "Most Points";

        case "avgPosition":
            return "Average Result";

        case "pctAhead":
            return "% Against Teammates";

        case "pointsFinish":
            return "Most Point Finishes";

        case "pointsFinish_pct":
            return "% Point Finishes";

        case "dnfs":
            return "Most DNFs";

        case "dnfs_pct":
            return "% DNFs";
        
        default:
            return stat;
    }
};
export type CircuitIds  =
    'bahrain'
    | 'imola'
    | 'portimao'
    | 'catalunya'
    | 'monaco'
    | 'BAK'
    | 'istanbul'
    | 'ricard'
    | 'red_bull_ring1'
    | 'red_bull_ring2'
    | 'silverstone'
    | 'hungaroring'
    | 'spa'
    | 'zandvoort'
    | 'monza'
    | 'sochi'
    | 'marina_bay'
    | 'suzuka'
    | 'americas'
    | 'rodriguez'
    | 'interlagos'
    | 'albert_park'
    | 'jeddah'
    | 'yas_marina';

export interface CountryInfo {
    gpName: string,
    flagCode: string
}

export const getGP = (circuitId: CircuitIds): CountryInfo => {
    switch(circuitId) {
        case 'bahrain':
            return { gpName: 'Bahrain', flagCode: 'BH' } ;
        case 'imola':
            return { gpName: 'Emilia Romagna', flagCode: 'IT' };
        case 'portimao':
            return { gpName: 'Portuguese', flagCode: 'PT' };
        case 'catalunya':
            return { gpName: 'Spanish', flagCode: 'ES' };
        case 'monaco':
            return { gpName: 'Monaco', flagCode: 'MC' };
        case 'BAK':
            return { gpName: 'Azerbaijan', flagCode: 'AZ' };
        case 'istanbul':
            return { gpName: 'Turkish', flagCode: 'TR' };
        case 'ricard':
            return { gpName: 'French', flagCode: 'FR' };
        case 'red_bull_ring1':
            return { gpName: 'Steiermark', flagCode: 'AT' };
        case 'red_bull_ring2':
            return { gpName: 'Austrian', flagCode: 'AT' };
        case 'silverstone':
            return { gpName: 'British', flagCode: 'GB' };
        case 'hungaroring':
            return { gpName: 'Hungarian', flagCode: 'HU' };
        case 'spa':
            return { gpName: 'Belgian', flagCode: 'BE' };
        case 'zandvoort':
            return { gpName: 'Dutch', flagCode: 'NL' };
        case 'monza':
            return { gpName: 'Italian', flagCode: 'IT' };
        case 'sochi':
            return { gpName: 'Russian', flagCode: 'RU' };
        case 'marina_bay':
            return { gpName: 'Singapore', flagCode: 'SG' };
        case 'suzuka':
            return { gpName: 'Japanese', flagCode: 'JP' };
        case 'americas':
            return { gpName: 'United States', flagCode: 'US' };
        case 'rodriguez':
            return { gpName: 'Mexican', flagCode: 'MX' };
        case 'interlagos':
            return { gpName: 'Brazilian', flagCode: 'BR' };
        case 'albert_park':
            return { gpName: 'Australian', flagCode: 'AU' };
        case 'jeddah':
            return { gpName: 'Saudi Arabian', flagCode: 'SA' };
        case 'yas_marina':
            return { gpName: 'Abu Dhabi', flagCode: 'AE' };
        default:
            return { gpName: "", flagCode: ""};
    }
};



export const getSessionInfo = (schedule: Schedule, sessionSel: string): string => {
    switch(sessionSel) {
        case "FP1":
            return schedule.practice_1;
        case "FP2":
            return schedule.practice_2;
        case "FP3":
            return schedule.practice_3;
        case "qualifying":
            return schedule.qualifying;
        default:
            return schedule.race;
    }
};

export const handleCountdown = (UTCdate: string): {days: number; hours: number; mins: number; secs: number} => {
    let diff = (Date.parse(UTCdate) - Date.parse(new Date().toUTCString())) / 1000;
    const countDown = {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0
    };

    diff = diff - 3600; // daylight saving time. ends on 31/10/2021

    if(diff >= 86400) {
        const dayTotal = Math.floor( diff / 86400 );
        countDown.days = dayTotal;
        diff = diff - dayTotal * 86400;
    }

    if(diff >= 3600) {
        const hourTotal = Math.floor( diff / 3600 );
        countDown.hours = hourTotal;
        diff = diff - hourTotal * 3600;
    }

    if(diff >= 60) {
        const minTotal = Math.floor( diff / 60 );
        countDown.mins = minTotal;
        diff = diff - minTotal * 60;
    }
    countDown.secs = diff;

    return countDown;
};

export const getMonthStr = (month: number): string => {
    const months = ["Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[month];
};

export const convertToAmPm = (time: string): string | number => {
    const hour24 = Number(time.substring(0,2));
    const mins = time.substring(3,5);
    
    if (hour24 === 0) return `12:${mins}am`;
    else if (hour24 > 0 && hour24 <= 12) return `${hour24.toString().padStart(2,'0')}:${mins}am`;
    else return `${(hour24 - 12).toString().padStart(2,'0')}:${mins}pm`;
};

export const getLocalDateWith = (dateStr: string): {date: string; time: string} => {

    /// includes daylight saving UK. ends in october
    const date = new Date(((Date.parse(dateStr)  / 1000) - 3600) * 1000);
    const time = new Date(((Date.parse(dateStr)  / 1000) - 3600) * 1000);
    
    return {
        date: `${getMonthStr(date.getMonth())} ${date.getDate().toString().padStart(2,'0')}`,
        time: `${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}`
    };
};

export const getLocalTimes = (eventSchedule: Schedule): DisplaySchedule => {

    //removes an hour for london day light saving. ends in october
    return {
        practice_1: getLocalDateWith(eventSchedule.practice_1),
        practice_2: getLocalDateWith(eventSchedule.practice_2),
        practice_3: getLocalDateWith(eventSchedule.practice_3),
        qualifying: getLocalDateWith(eventSchedule.qualifying),
        race: getLocalDateWith(eventSchedule.race),
    };
};

export const getTrackTimes = (trackSchedule: Schedule): DisplaySchedule => {
    const getDateWith = (date: string) => {
        const day = date.substring(8, 10);
        const month = date.substring(5, 7);
        const hour = date.substring(11, 13);
        const min = date.substring(14, 16);

        return {
            date: `${getMonthStr(Number(month) - 1)} ${day}`,
            time: `${hour}:${min}` 
        };
    };

    return {
        practice_1: getDateWith(trackSchedule.practice_1),
        practice_2: getDateWith(trackSchedule.practice_2),
        practice_3: getDateWith(trackSchedule.practice_3),
        qualifying: getDateWith(trackSchedule.qualifying),
        race: getDateWith(trackSchedule.race),
    };
};
