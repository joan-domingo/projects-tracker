import _ from 'lodash';
import { combineEpics, Epic } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { createSelector, ParametricSelector } from 'reselect';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  Project,
  ProjectCollection,
  ProjectUpdate,
  ProjectUpdateCollection,
} from '../shared/models/ProjectData';
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
    .last()
    .value();

export const selectIsLoadingProjects = (state: State) =>
  state.projectData.isLoadingProjects;

export const selectProjects = (state: State) => state.projectData.projects;

export const selectProject: ParametricSelector<
  State,
  string,
  Project | undefined
> = createSelector(
  [selectProjects, (state: State, projectId: string) => projectId],
  (projects, projectId) => (projects ? projects[projectId] : undefined)
);

export const selectLastProjectUpdate: ParametricSelector<
  State,
  string,
  ProjectUpdate | undefined
> = createSelector([selectProject], project => {
  if (project !== undefined && _.values(project.updates).length > 0) {
    return _.last(_.values(project.updates));
  }
  return undefined;
});

export const selectProjectUpdates = (
  state: State,
  projectId: string
): ProjectUpdateCollection | undefined =>
  state.projectData.projects &&
  state.projectData.projects[projectId] &&
  state.projectData.projects[projectId].updates;

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
