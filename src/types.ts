export interface BasePeriod {
    period              : string;
    entries             : number;
    firstEntry          : Occasion;
    lastEntry           : Occasion;
    points              : number;
    avgPoints           : number;
    stats               : Stat[];
    bestResult          : number;
    worstResult         : number;
    avgPosition         : number;
    championshipRank    : number;
}

///////////////////////////////////
//
//  DRIVER TYPES
//
//
export interface CurrentTeamInfo {
    team        : string;
    teammate    : string;
}


export interface VersusTeammates {
    driverAhead     : number;
    teammatesAhead  : number;
    pctAhead        : number;
}

export interface Occasion {
    date    : string;
    race    : string;
}

export interface Stat {
    stat    : string;
    total   : number;
    pct     : number;
    first   : Occasion;
    last    : Occasion;
}


export interface DriverPeriod extends BasePeriod {
    teams               : string[];
    vsTeammates         : VersusTeammates;
}


export interface BaseInfo {
    givenName           : string;
    familyName          : string;
    url?                : string;
    nationality         : string;
    permanentNumber?    : string;
    code?               : string;
    driverId            : string;
    dateOfBirth         : string;
}



export interface Driver extends BaseInfo {
    championships   : string[];
    seasonsIn       : string[];
    current?        : CurrentTeamInfo;
    entries         : DriverPeriod[];
}



///////////////////////
//
//
// TEAM TYPES
//

export interface TeamPeriod extends BasePeriod {
    drivers: string[];
}

export interface TeamBaseInfo {
    constructorId   : string;
    name            : string;
    nationality     : string;
    url?            : string;
}

export interface Team extends TeamBaseInfo {
    championships   : string[];
    seasonsIn       : string[];
    entries         : TeamPeriod[];
}

///////////////////////
//
//
// RACE TYPES
//

export interface Location {
    lat         : string;
    long        : string;
    locality    : string;
    country     : string;
}

export interface Circuit {
    circuitId   : string;
    circuitName : string;
    url         : string;
    Location    : Location
}

export interface FastestLap {
    lap             : string;
    rank            : string;
    Time            : { time: string; };
    AverageSpeed    : { units: string; speed: string;}
}


export interface Pos {
    grid            : string;
    laps            : string;
    number          : string;
    points          : string;
    position        : string;
    positionText    : string;
    status          : string;
    Driver          : BaseInfo;
    Constructor     : TeamBaseInfo;
    FastestLap?     : FastestLap;
    Time            : { millis: string; time: string; }
}

export interface Race {
    date        : string;
    raceName    : string;
    round       : string;
    season      : string;
    time?       : string;
    url         : string;
    Circuit     : Circuit;
    Results     : Pos[];
}

export interface Season {
    races   : Race[];
    season  : string;
}

export interface CurrTeamStyles {
    team        : string;
    primary     : string;
    secondary   : string;
}


//////////////////////////////////
//
//  Circuit types
//
//

export interface LapRecord {
    time: string;
    driver: string;
    season: string;  
}

export interface CircuitResult {
    raceName: string;
    season: string;
    round: string;
    result: Pos[];
}


export interface Schedule {
    practice_1: string;
    practice_2: string;
    practice_3: string;
    qualifying: string;
    race: string;
}

export interface CircuitType {
    circuitId: string;
    circuitName: string;
    raceName: string;
    scheduleTrack: Schedule;
    scheduleUTC: Schedule;
    firstGP: string;
    laps: number;
    length: number;
    raceDistance: number;
    location?: Location;
    lapRecord?: LapRecord;
    results: CircuitResult[];
}