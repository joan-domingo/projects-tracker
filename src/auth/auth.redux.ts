import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { ignoreElements, mergeMap, switchMap } from 'rxjs/operators';
import { User } from '../shared/models/UserData';
import AuthService from './AuthService';

export interface AuthState {
  isAuthInitialized: boolean;
  user: User | undefined;
}

// Selectors

interface State {
  auth: AuthState;
}

export const selectIsAuthInitialized = (state: State) =>
  state.auth.isAuthInitialized;

export const selectIsSignedIn = (state: State) => Boolean(state.auth.user);

export const selectDisplayName = (state: State) =>
  !!state.auth.user ? state.auth.user.displayName : undefined;

// Actions

export const loginAction = createAction('auth/login');
export const loginDoneAction = createAction('auth/loginDone').withPayload<
  firebase.User
>();

export const logoutAction = createAction('auth/logout');
export const logoutDoneAction = createAction('auth/logoutDone');

// Epics

export interface AuthDependencies {
  authService: AuthService;
}

type AuthEpic = Epic<any, any, any, AuthDependencies>;

const onAuthStateChangedEpic: AuthEpic = (action$, state$, { authService }) =>
  authService
    .onAuthStateChanged$()
    .pipe(
      mergeMap((user: firebase.User | null) =>
        user ? of(loginDoneAction(user)) : of(logoutDoneAction())
      )
    );

const loginEpic: AuthEpic = (action$, state$, { authService }) =>
  action$.pipe(
    ofType(loginAction.type),
    switchMap(() => authService.signUserIn$()),
    ignoreElements()
  );

const logoutEpic: AuthEpic = (action$, state$, { authService }) =>
  action$.pipe(
    ofType(logoutAction.type),
    switchMap(() => authService.signUserOut$()),
    ignoreElements()
  );

export const authEpic: AuthEpic = combineEpics(
  onAuthStateChangedEpic,
  loginEpic,
  logoutEpic
);

// Reducer

const initialAuthState: AuthState = {
  isAuthInitialized: false,
  user: undefined,
};

export default chainReducers(
  withInitialState(initialAuthState),

  onAction(loginDoneAction, (state, action) => ({
    ...state,
    isAuthInitialized: true,
    user: {
      email: action.payload.email!,
      displayName: action.payload.displayName!,
    },
  })),

  onAction(logoutDoneAction, state => ({
    ...initialAuthState,
    isAuthInitialized: true,
  }))
);
