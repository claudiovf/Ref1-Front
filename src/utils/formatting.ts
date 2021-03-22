import { TeamNameId } from "../store/searchTypes";
import { getDriverStyle, patchId } from "./currentInfo";


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

export const splitStat = (stateStat: string): { stat: string; isPct: boolean; } => {
    const split = stateStat.split("_");
    if (split.length === 1 ) return { stat: stateStat, isPct: false};
    else return { stat: split[0], isPct: true };
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
