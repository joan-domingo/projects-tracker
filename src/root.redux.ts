import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

// State

// tslint:disable-next-line: no-empty-interface
export interface State {}

// Epic

export const rootEpic = combineEpics();

// Reducer

export default combineReducers({});
