import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import AuthService, { UserCredentials } from './AuthService';

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
export const initializeAuthSuccessAction = createAction(
  'auth/initializeAuthSuccess'
).withPayload<string>();
export const initializeAuthFailureAction = createAction(
  'auth/initializeAuthFailure'
);

export const logoutAction = createAction('auth/logout');
export const logoutSuccessAction = createAction('auth/logoutSuccess');
export const logoutFailureAction = createAction('auth/logoutFailure');

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
        map((user: UserCredentials) => initializeAuthSuccessAction(user.email)),
        catchError(() => of(initializeAuthFailureAction()))
      )
    )
  );

const logoutEpic: AuthEpic = (action$, state$, { authService }) =>
  action$.pipe(
    ofType(logoutAction.type),
    switchMap(() =>
      authService.signUserOut$().pipe(
        mergeMap(() => of(logoutSuccessAction())),
        catchError(() => of(logoutFailureAction()))
      )
    )
  );

export const authEpic: AuthEpic = combineEpics(initializeAuthEpic, logoutEpic);

// Reducer

const initialAuthState: AuthState = {
  userId: undefined,
};

export default chainReducers(
  withInitialState(initialAuthState),

  onAction(initializeAuthSuccessAction, (state, action) => ({
    ...state,
    userId: action.payload,
  })),

  onAction(logoutSuccessAction, state => ({
    ...state,
    ...initialAuthState,
  }))
);