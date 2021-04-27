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
    ? "#e4eced" 
    : getDriverStyle(patchId(id, givenName)).primary;
}; 

export const formattedStat = (stat: string): string => {
    switch(true) {
        case stat === "wins":
            return "Most Wins";

        case stat === "wins_pct":
            return "% Wins";

        case stat === "podiums":
            return "Most Podiums";

        case stat === "podiums_pct":
            return "% Podiums";

        case stat === "entries":
            return "Most Entries";

        case stat === "avgPoints":
            return "Average Points";

        case stat === "points":
            return "Most Points";

        case stat === "avgPosition":
            return "Average Result";

        case stat === "pctAhead":
            return "% Against Teammates";

        case stat === "pointsFinish":
            return "Most Point Finishes";

        case stat === "pointsFinish_pct":
            return "% Point Finishes";

        case stat === "dnfs":
            return "Most DNFs";

        case stat === "dnfs_pct":
            return "% DNFs";
        
        default:
            return stat;
    }
};

export const getGP = (circuitId: string): string => {
    switch(true) {
        case circuitId === 'bahrain':
            return 'Bahrain';
        case circuitId === 'imola':
            return 'Emilia Romagna';
        case circuitId === 'portimao':
            return 'Portuguese';
        case circuitId === 'catalunya':
            return 'Spanish';
        case circuitId === 'monaco':
            return 'Monaco';
        case circuitId === 'BAK':
            return 'Azerbaijan';
        case circuitId === 'villeneuve':
            return 'Canadian';
        case circuitId === 'ricard':
            return 'French';
        case circuitId === 'red_bull_ring':
            return 'Austrian';
        case circuitId === 'silverstone':
            return 'British';
        case circuitId === 'hungaroring':
            return 'Hungarian';
        case circuitId === 'spa':
            return 'Belgian';
        case circuitId === 'zandvoort':
            return 'Dutch';
        case circuitId === 'monza':
            return 'Italian';
        case circuitId === 'sochi':
            return 'Russian';
        case circuitId === 'marina_bay':
            return 'Singapore';
        case circuitId === 'suzuka':
            return 'Japanese';
        case circuitId === 'americas':
            return 'United States';
        case circuitId === 'rodriguez':
            return 'Mexican';
        case circuitId === 'interlagos':
            return 'Brazilian';
        case circuitId === 'albert_park':
            return 'Australian';
        case circuitId === 'jeddah':
            return 'Saudi Arabian';
        case circuitId === 'yas_marina':
            return 'Abu Dhabi';
        default:
            return "";
    }
};

export const getSessionInfo = (schedule: Schedule, sessionSel: string): string => {
    switch(true) {
        case sessionSel === "FP1":
            return schedule.practice_1;
        case sessionSel === "FP2":
            return schedule.practice_2;
        case sessionSel === "FP3":
            return schedule.practice_3;
        case sessionSel === "qualifying":
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

export const getLocalTimes = (eventSchedule: Schedule): DisplaySchedule => {
    const getLocalDateWith = (dateStr: string) => {

        /// includes daylight saving UK. ends in october
        const date = new Date(((Date.parse(dateStr)  / 1000) - 3600) * 1000);
        const time = new Date(((Date.parse(dateStr)  / 1000) - 3600) * 1000);
        
        return {
            date: `${getMonthStr(date.getMonth())} ${date.getDate().toString().padStart(2,'0')}`,
            time: `${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}`
        };
    };

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