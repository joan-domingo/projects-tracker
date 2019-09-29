import { combineEpics, Epic } from 'redux-observable';
import { chainReducers, createAction, withInitialState } from 'redux-preboiled';
import ProjectDataService from './ProjectDataService';

// tslint:disable-next-line: no-empty-interface
export interface ProjectDataState {}

// Selectors

interface State {
  project: ProjectDataState;
}

// Actions

export const addProjectAction = createAction('projectData/addProject');

// Epics

export interface ProjectDataDependencies {
  projectDataService: ProjectDataService;
}

type ProjectDataEpic = Epic<any, any, any, ProjectDataDependencies>;

export const projectDataEpic: ProjectDataEpic = combineEpics();

// Reducer

const initialProjectDataState: ProjectDataState = {};

export default chainReducers(withInitialState(initialProjectDataState));
