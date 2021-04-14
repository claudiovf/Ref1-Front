import { gql } from '@apollo/client';


export const DRIVER_PROFILE = gql`
    query getDriver(
        $driverId: String!
    ) {
        findDriver(
            driverId: $driverId
        ) {
            givenName
            familyName
            driverId
            code
            nationality
            dateOfBirth
            permanentNumber
            seasonsIn
            championships
            entries {
                period
                entries
                firstEntry {
                    date
                    race
                }
                lastEntry {
                    date
                    race
                }
                points
                avgPoints
                bestResult
                worstResult
                avgPosition
                championshipRank
                vsTeammates {
                    driverAhead
                    teammatesAhead
                    pctAhead
                }
                stats {
                    stat
                    total
                    pct
                    first {
                        date
                        race
                    }
                    last {
                        date
                        race
                    }
                }
            }
        }
    }
`;

export const TEAM_PROFILE = gql`
    query getTeam(
        $constructorId: String!
    ) {
        findTeam(
            constructorId: $constructorId
        ) {
            name
            constructorId
            url
            nationality
            seasonsIn
            championships
            entries {
                period
                entries
                firstEntry {
                    date
                    race
                }
                lastEntry {
                    date
                    race
                }
                points
                avgPoints
                bestResult
                worstResult
                avgPosition
                championshipRank
                drivers
                stats {
                    stat
                    total
                    pct
                    first {
                        date
                        race
                    }
                    last {
                        date
                        race
                    }
                }
            }
        }
    }
`;

export const GET_THIS_DRIVERS = gql`
    query getThisDrivers($driversList: [String!]!){
        findManyDrivers (
        driversList: $driversList
        ) {
            givenName
            familyName
            driverId
        }
    }
`;

export const GET_SEASON_DRIVERS = gql`
    query getThisDrivers($driversList: [String!]!){
        findManyDrivers (
        driversList: $driversList
        ) {
            givenName
            familyName
            driverId
            code
            permanentNumber
        }
    }
`;

export const GET_SEASON_TEAMS = gql`
    query getTeams($teamsList: [String!]!){
        findManyTeams(
        teamsList: $teamsList
        ) {
            name
            constructorId
    
        }
    }
`;

export const GET_TEAM_NAMES = gql`
    query getTeamNames($teamsList: [String!]){
        findManyTeams(
        teamsList: $teamsList
        ) {
            name
            constructorId
        }
    }
`;

export const GET_DRIVER_RESULTS = gql`
    query getResults($period: String!, $stat: String!, $skip: Int!, $pct: Boolean!){
        findDriverResults(
            period: $period
            stat: $stat
            skip: $skip
            pct: $pct
        ) {
            driverId
            givenName
            familyName
            entries{
                entries
                points
                avgPosition
                avgPoints
                bestResult
                stats {
                    stat
                    total
                    pct
                }
            }
        }
    }
`;
export const GET_TEAM_RESULTS = gql`
    query getResults($period: String!, $stat: String!, $skip: Int!, $pct: Boolean!){
        getTeamSearchResults(
            period: $period
            stat: $stat
            skip: $skip
            pct: $pct
        ) {
            constructorId
            name
            entries{
                entries
                points
                avgPosition
                avgPoints
                bestResult
                stats {
                    stat
                    total
                    pct
                }
            }
        }
    }
`;

export const GET_NEXT_RACES = gql`
    query findingCircuit {
        findAllCircuits {
            circuitId
            scheduleUTC {
                race
            }
            location {
                country
                locality
            }  
            circuitName     
            raceName  
            scheduleUTC {
                practice_1
                race
            }     
        }
    }
`;

export const GET_NEXT_RACE = gql`
    query findCircuit($circuitId: String!){
        findCircuit (
            circuitId: $circuitId
        ) {
            circuitId
            raceName

            scheduleUTC {
                race
            }
            location {
                country
                locality
                lat
                long
            }
        }
    }
`;

export const CIRCUIT_PROFILE = gql`
    query getCircuit(
        $circuitId: String!
    ) {
        findCircuit(
            circuitId: $circuitId
        ) {
            circuitId       
            circuitName     
            raceName        
            scheduleTrack {
                practice_1  
                practice_2  
                practice_3  
                qualifying  
                race        
            }   
            scheduleUTC  {
                practice_1  
                practice_2  
                practice_3  
                qualifying  
                race   
            }    
            firstGP         
            laps            
            length          
            raceDistance    
            location {
                lat
                long
                locality
                country
            }       
            lapRecord {
                time
                driver
                season
            }   
            results         
        }
    }
`;

