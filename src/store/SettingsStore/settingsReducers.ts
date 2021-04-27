import { 
    SettingsActionTypes, SettingsState, 
    SET_DISTANCE, SET_TEMP, SET_TIME_FORMAT, TOGGLE_SETTINGS_OPEN 
} from "./settingsTypes";

const initialState: SettingsState = {
    temp: 'c',
    distance: localStorage.getItem('distUnit') ? 'm' : 'k',
    timeFormat: localStorage.getItem('timeFormat') ? 'ampm' : '24hour',
    isOpen: false
};

export const settingsReducer = ( state = initialState, action: SettingsActionTypes ): SettingsState => {
    switch (action.type) {
        case TOGGLE_SETTINGS_OPEN:
            return { 
                ...state,
                isOpen: !state.isOpen
            };
        case SET_TEMP:
            return { 
                ...state,
                temp: action.payload
            };
        case SET_DISTANCE:
            return { 
                ...state,
                distance: action.payload
            };
        case SET_TIME_FORMAT:
            return { 
                ...state,
                timeFormat: action.payload
            };
        default:
            return state;
    }
};