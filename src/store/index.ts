import { combineReducers } from 'redux';
import { searchReducer } from './reducers';

export const rootReducer = combineReducers({
    search: searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;
