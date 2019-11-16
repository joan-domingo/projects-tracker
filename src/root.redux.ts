import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
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
  newProject: NewProjectState;
  projectData: ProjectDataState;
}

// Epic

export const rootEpic = combineEpics(newProjectEpic, projectDataEpic);

// Reducer

export default combineReducers({
  newProject: newProjectReducer,
  projectData: projectDataReducer,
});
