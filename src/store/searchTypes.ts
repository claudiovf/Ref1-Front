import { DriverResult, TeamResult } from "../types";

export interface TeamNameId {
    name: string;
    constructorId: string;
}

export interface Search {
    resultsFor?: string;
    sortBy?: string;
    filterBy?: string;
    period?: TeamNameId | string;
}

export type Results = DriverResult | TeamResult;

export interface SearchState {
    selections: Search;
    isOpen: boolean;
    teamNames: TeamNameId[];
    currResults: Results[];
    prevResults: Results[];
}

export const SET_SEARCH = 'SET_SEARCH';
export const TOGGLE_OPEN = 'TOGGLE_OPEN';
export const SET_TEAM_NAMES = 'SET_TEAM_NAMES';
export const SET_CURR_RESULTS = 'SET_CURR_RESULTS';
export const SET_PREV_RESULTS = 'SET_PREV_RESULTS';

export interface SetSearchAction {
    type: typeof SET_SEARCH
    payload: Search
}

export interface ToggleOpenAction {
    type: typeof TOGGLE_OPEN
}

export interface SetTeamNamesAction {
    type: typeof SET_TEAM_NAMES
    payload: TeamNameId[]
}

export interface SetCurrResults {
    type: typeof SET_CURR_RESULTS
    payload: Results[]
}
export interface SetPrevResults {
    type: typeof SET_PREV_RESULTS
    payload: Results[]
}

export type ActionTypes = SetSearchAction | ToggleOpenAction | SetTeamNamesAction | SetCurrResults | SetPrevResults;