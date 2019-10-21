import _ from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Project, ProjectCollection } from '../shared/models/ProjectData';
import ProjectDataService from './ProjectDataService';

export interface ProjectDataState {
  projects: ProjectCollection | undefined;
  isLoadingProjects: boolean;
}

// Selectors

interface State {
  projectData: ProjectDataState;
}

export const selectProjectsNewestUpdateList = (state: State) =>
  _.chain(state.projectData.projects)
    .values()
    .map((p: Project) => selectNewestProjectUpdate(p))
    .value();

export const selectNewestProjectUpdate = (project: Project) =>
  _.chain(project.updates)
    .values()
    .sortBy('timeMillis')
    .first()
    .value();

export const selectIsLoadingProjects = (state: State) =>
  state.projectData.isLoadingProjects;

// Actions

export const readProjectDataDoneAction = createAction(
  'projectData/readProjectDataDone'
).withPayload<ProjectCollection>();

// Epics

export interface ProjectDataDependencies {
  projectDataService: ProjectDataService;
}

type ProjectDataEpic = Epic<any, any, any, ProjectDataDependencies>;

const readProjectDataEpic: ProjectDataEpic = (
  action$,
  state$,
  { projectDataService }
) =>
  projectDataService
    .readProjectData$()
    .pipe(mergeMap(response => of(readProjectDataDoneAction(response))));

export const projectDataEpic: ProjectDataEpic = combineEpics(
  readProjectDataEpic
);

// Reducer

const initialProjectDataState: ProjectDataState = {
  projects: undefined,
  isLoadingProjects: true,
};

export default chainReducers(
  withInitialState(initialProjectDataState),

  onAction(readProjectDataDoneAction, (state, action) => ({
    ...state,
    projects: action.payload,
    isLoadingProjects: false,
  }))
);
