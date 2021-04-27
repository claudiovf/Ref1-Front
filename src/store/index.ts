import { combineReducers } from 'redux';
import { searchReducer } from './reducers';
import { settingsReducer } from './SettingsStore/settingsReducers';

export const rootReducer = combineReducers({
    search: searchReducer,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
