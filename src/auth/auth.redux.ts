import { combineEpics, Epic, ofType } from 'redux-observable';
import { chainReducers, createAction, withInitialState } from 'redux-preboiled';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import AuthService from './AuthService';

export interface AuthState {
  userId: string | undefined;
}

// Selectors

interface State {
  auth: AuthState;
}

export const selectIsSignedIn = (state: State) => Boolean(state.auth.userId);

// Actions

export const initializeAuthAction = createAction('auth/initializeAuth');
export const initializeAuthSuccessAction = createAction<string>(
  'auth/initializeAuthSuccess'
);
export const initializeAuthFailureAction = createAction(
  'auth/initializeAuthFailure'
);

// Epics

export interface AuthDependencies {
  authService: AuthService;
}

type AuthEpic = Epic<any, any, any, AuthDependencies>;

const initializeAuthEpic: AuthEpic = (action$, state$, { authService }) =>
  action$.pipe(
    ofType(initializeAuthAction.type),
    switchMap(() =>
      authService.getUser$().pipe(
        map(initializeAuthSuccessAction),
        catchError(() => of(initializeAuthFailureAction()))
      )
    )
  );

export const authEpic: AuthEpic = combineEpics(initializeAuthEpic);

// Reducer

const initialAuthState: AuthState = {
  userId: undefined,
};

export default chainReducers(withInitialState(initialAuthState));
