import moment from 'moment';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import ProjectDataService from '../projectList/ProjectDataService';
import { Project, ProjectUpdate } from '../shared/models/ProjectData';

export interface NewProjectState {
  isSavingProject: boolean;
  isProjectSaved: boolean;
  projectName?: string;
  projectGoal?: string;
}

// Selectors

interface State {
  newProject: NewProjectState;
}

export const selectNewProjectName = (state: State): string =>
  state.newProject.projectName || '';

export const selectNewProjectGoal = (state: State): string =>
  state.newProject.projectGoal || '';

export const selectIsProjectSaved = (state: State): boolean =>
  state.newProject.isProjectSaved;

// Actions

export const saveProjectAction = createAction('newProject/saveProjectAction');
export const saveProjectSuccessAction = createAction(
  'newProject/saveProjectSuccess'
);
export const saveProjectFailureAction = createAction(
  'newProject/saveProjectFailure'
);

export const initializeNewProjectAction = createAction(
  'newProject/initializeNewProject'
);

export const setProjectNameAction = createAction(
  'newProject/setProjectName'
).withPayload<string>();

export const setProjectGoalAction = createAction(
  'newProject/setProjectGoal'
).withPayload<string>();

// Epics

export interface NewProjectDependencies {
  projectDataService: ProjectDataService;
}

type NewProjectEpic = Epic<any, any, any, NewProjectDependencies>;

const saveProjectEpic: NewProjectEpic = (
  action$,
  state$,
  { projectDataService }
) =>
  action$.pipe(
    ofType(saveProjectAction.type),
    switchMap(() => {
      const project = convertFormDataToProjectData(state$.value.newProject);
      return projectDataService.addNewProject$(project).pipe(
        mapTo(saveProjectSuccessAction()),
        catchError(() => of(saveProjectFailureAction()))
      );
    })
  );

function convertFormDataToProjectData(newProject: NewProjectState): Project {
  const now = moment.now();
  const projectId = `${newProject.projectName!}-${now}`;

  const projectOverview = {
    projectName: newProject.projectName!,
    projectGoal: newProject.projectGoal!,
  };

  const firstUpdate: ProjectUpdate = {
    updateId: `${now}`,
    timeMillis: now,
    projectId,
    projectLocation: [],
    projectOverview,
  };
  return {
    projectId,
    updates: { [firstUpdate.updateId]: firstUpdate },
  };
}

export const newProjectEpic: NewProjectEpic = combineEpics(saveProjectEpic);

// Reducer

const initialNewProjectState: NewProjectState = {
  isSavingProject: false,
  isProjectSaved: false,
};

export default chainReducers(
  withInitialState(initialNewProjectState),

  onAction(saveProjectAction, state => ({
    ...state,
    isSavingProject: true,
    isProjectSaved: false,
  })),

  onAction(saveProjectSuccessAction, state => ({
    ...state,
    isSavingProject: false,
    isProjectSaved: true,
  })),

  onAction(saveProjectFailureAction, state => ({
    ...state,
    isSavingProject: false,
  })),

  onAction(initializeNewProjectAction, state => ({
    ...initialNewProjectState,
  })),

  onAction(setProjectNameAction, (state, action) => ({
    ...state,
    projectName: action.payload,
  })),

  onAction(setProjectGoalAction, (state, action) => ({
    ...state,
    projectGoal: action.payload,
  }))
);
