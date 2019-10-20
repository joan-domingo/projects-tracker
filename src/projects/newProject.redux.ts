import { combineEpics, Epic } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import ProjectDataService from '../projectList/ProjectDataService';

interface NewProjectData {
  projectName?: string;
  projectGoal?: string;
}

export interface NewProjectState {
  newProject: NewProjectData | undefined;
}

// Selectors

interface State {
  newProject: NewProjectState;
}

// Actions

export const setProjectNameAction = createAction(
  'newProject/setProjectName'
).withPayload<string>();

// Epics

export interface NewProjectDependencies {
  projectDataService: ProjectDataService;
}

type NewProjectEpic = Epic<any, any, any, NewProjectDependencies>;

export const newProjectEpic: NewProjectEpic = combineEpics();

// Reducer

const initialNewProjectState: NewProjectState = {
  newProject: undefined,
};

export default chainReducers(
  withInitialState(initialNewProjectState),

  onAction(setProjectNameAction, (state, action) => ({
    ...state,
    newProject: {
      ...state.newProject,
      projectName: action.payload,
    },
  }))
);
