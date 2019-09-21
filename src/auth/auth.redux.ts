import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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

export const authEpic: AuthEpic = combineEpics(initializeAuthEpic);

// Reducer

const initialAuthState: AuthState = {
  userId: undefined,
};

export default chainReducers(
  withInitialState(initialAuthState),

  onAction(initializeAuthSuccessAction, (state, action) => ({
    ...state,
    userId: action.payload,
  }))
);
