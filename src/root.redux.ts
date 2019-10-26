import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { authEpic, AuthState } from './auth/auth.redux';
import newProjectReducer, {
  newProjectEpic,
  NewProjectState,
} from './projects/newProject/newProject.redux';
import projectDataReducer, {
  projectDataEpic,
  ProjectDataState,
} from './projects/projectData.redux';

// State

export interface State {
  auth: AuthState;
  newProject: NewProjectState;
  projectData: ProjectDataState;
}

// Epic

export const rootEpic = combineEpics(authEpic, newProjectEpic, projectDataEpic);

// Reducer

export default combineReducers({
  auth: authReducer,
  newProject: newProjectReducer,
  projectData: projectDataReducer,
});
