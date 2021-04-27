import { 
    Temp, Distance, TimeFormat,
    SetDistanceAction, SetTempAction, SetTimeFormatAction,
    SET_DISTANCE, SET_TEMP, SET_TIME_FORMAT, ToggleSettingsOpenAction, TOGGLE_SETTINGS_OPEN 
} from "./settingsTypes";


export const toggleSettingsOpen = (): ToggleSettingsOpenAction => {
    return {
        type: TOGGLE_SETTINGS_OPEN
    };
};

export const setTemp = (tempSelection: Temp): SetTempAction => {
    return {
        type: SET_TEMP,
        payload: tempSelection
    };
};

export const setDistance = (distanceSelection: Distance): SetDistanceAction => {
    return {
        type: SET_DISTANCE,
        payload: distanceSelection
    };
};

export const setTimeFormat = (timeFormarSelection: TimeFormat): SetTimeFormatAction => {
    return {
        type: SET_TIME_FORMAT,
        payload: timeFormarSelection
    };
};