import { TeamNameId } from "../store/searchTypes";
import { Driver, Team } from "../types";
import { getDriverStyle, patchId } from "./currentInfo";


export const isDark = (stat: string): boolean => {
    if ( stat === "wins" || stat === "pointsFinish" || stat === "entries") return false;
    else return true;
};

export const formattedPeriod = (teamName: string): string => {
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


export const getDisplayStat = (obj: Driver | Team, splitStat: SplitStat): number | null => {
        
    if (splitStat.isPct) return Number(obj.entries[0].stats[0].pct.toFixed(2));

    else if (!splitStat.isPct && !splitStat.isPeriodLevel) return obj.entries[0].stats[0].total;
    
    switch(true) {
        case splitStat.stat === "points":
            return obj.entries[0].points;
        case splitStat.stat === "avgPoints":
            return obj.entries[0].avgPoints;
        case splitStat.stat === "avgPosition":
            return obj.entries[0].avgPosition;
        case splitStat.stat === "entries":
            return obj.entries[0].entries;
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
