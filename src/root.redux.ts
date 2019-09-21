import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { authEpic, AuthState } from './auth/auth.redux';

// State

export interface State {
  auth: AuthState;
}

// Epic

export const rootEpic = combineEpics(authEpic);

// Reducer

export default combineReducers({ auth: authReducer });
