import { SearchState, ActionTypes, 
    SET_SEARCH, TOGGLE_OPEN, 
    SET_TEAM_NAMES, SET_CURR_RESULTS,
    SET_PREV_RESULTS 
} from './searchTypes';

const initialState: SearchState = {
    selections: {},
    isOpen: false,
    teamNames: [],
    currResults: [],
    prevResults: []
};

export const searchReducer = ( state = initialState, action: ActionTypes ): SearchState => {
    switch (action.type) {
        case SET_SEARCH:
            return { 
                ...state,
                selections: action.payload 
            };
        case TOGGLE_OPEN:
            return { 
                ...state,
                isOpen: !state.isOpen
            };
        case SET_TEAM_NAMES:
            return { 
                ...state,
                teamNames: action.payload
            };
        case SET_CURR_RESULTS:
            return { 
                ...state,
                currResults: action.payload
            };
        case SET_PREV_RESULTS:
            return { 
                ...state,
                prevResults: action.payload
            };
        default:
            return state;
    }
};