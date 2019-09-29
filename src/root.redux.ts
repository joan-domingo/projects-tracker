import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { authEpic, AuthState } from './auth/auth.redux';
import projectDataReducer, {
  projectDataEpic,
  ProjectDataState,
} from './projectList/projectList.redux';

// State

export interface State {
  auth: AuthState;
  projectData: ProjectDataState;
}

// Epic

export const rootEpic = combineEpics(authEpic, projectDataEpic);

// Reducer

export default combineReducers({
  auth: authReducer,
  projectData: projectDataReducer,
});
