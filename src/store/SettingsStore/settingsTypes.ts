
export type Temp = 'c' | 'f';
export type Distance = 'k' | 'm';
export type TimeFormat = '24hour' | 'ampm';

export interface SettingsState {
    temp: Temp;
    distance: Distance;
    timeFormat: TimeFormat;
    isOpen: boolean;
    isDarkMode: boolean;
}

export const TOGGLE_SETTINGS_OPEN = 'TOGGLE_SETTINGS_OPEN';
export const SET_TEMP = 'SET_TEMP';
export const SET_DISTANCE = 'SET_DISTANCE';
export const SET_TIME_FORMAT = 'SET_TIME_FORMAT';
export const SET_DARK_MODE = 'SET_DARK_MODE';


export interface ToggleSettingsOpenAction {
    type: typeof TOGGLE_SETTINGS_OPEN
}

export interface SetTempAction {
    type: typeof SET_TEMP
    payload: Temp
}

export interface SetDistanceAction {
    type: typeof SET_DISTANCE
    payload: Distance
}
export interface SetTimeFormatAction {
    type: typeof SET_TIME_FORMAT
    payload: TimeFormat
}

export interface SetDarkMode {
    type: typeof SET_DARK_MODE
}

export type SettingsActionTypes = ToggleSettingsOpenAction | SetTempAction | SetDistanceAction | SetTimeFormatAction | SetDarkMode;