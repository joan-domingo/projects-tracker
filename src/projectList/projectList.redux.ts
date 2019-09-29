import _ from 'lodash';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { catchError, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { ProjectCollection } from '../shared/models/ProjectData';
import ProjectDataService from './ProjectDataService';

export interface ProjectDataState {
  projects: ProjectCollection | undefined;
  isAddingProject: boolean;
}

// Selectors

interface State {
  projectData: ProjectDataState;
}

export const selectProjectList = (state: State) =>
  _.values(state.projectData.projects);

// Actions

export const addProjectAction = createAction('projectData/addProject');
export const addProjectSuccessAction = createAction(
  'projectData/addProjectSuccess'
);
export const addProjectFailureAction = createAction(
  'projectData/addProjectFailure'
);

export const readProjectDataDoneAction = createAction(
  'projectData/readProjectDataDone'
).withPayload<ProjectCollection>();

// Epics

export interface ProjectDataDependencies {
  projectDataService: ProjectDataService;
}

type ProjectDataEpic = Epic<any, any, any, ProjectDataDependencies>;

const addProjectEpic: ProjectDataEpic = (
  action$,
  state$,
  { projectDataService }
) =>
  action$.pipe(
    ofType(addProjectAction.type),
    switchMap(() =>
      projectDataService.addNewProject$().pipe(
        mapTo(addProjectSuccessAction()),
        catchError(() => of(addProjectFailureAction()))
      )
    )
  );

const readProjectDataEpic: ProjectDataEpic = (
  action$,
  state$,
  { projectDataService }
) =>
  projectDataService
    .readProjectData$()
    .pipe(mergeMap(response => of(readProjectDataDoneAction(response))));

export const projectDataEpic: ProjectDataEpic = combineEpics(
  addProjectEpic,
  readProjectDataEpic
);

// Reducer

const initialProjectDataState: ProjectDataState = {
  projects: undefined,
  isAddingProject: false,
};

export default chainReducers(
  withInitialState(initialProjectDataState),

  onAction(addProjectAction, state => ({
    ...state,
    isAddingProject: true,
  })),

  onAction(addProjectSuccessAction, state => ({
    ...state,
    isAddingProject: false,
  })),

  onAction(addProjectFailureAction, state => ({
    ...state,
    isAddingProject: false,
  })),

  onAction(readProjectDataDoneAction, (state, action) => ({
    ...state,
    projects: action.payload,
  }))
);
