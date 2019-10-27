import moment from 'moment';
import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  chainReducers,
  createAction,
  onAction,
  withInitialState,
} from 'redux-preboiled';
import { of } from 'rxjs';
import { catchError, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { Project, ProjectUpdate } from '../../shared/models/ProjectData';
import ProjectDataService from '../ProjectDataService';

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

export const selectNewProjectName = (state: State) =>
  state.newProject.projectName;

export const selectNewProjectGoal = (state: State) =>
  state.newProject.projectGoal;

export const selectIsProjectSaved = (state: State): boolean =>
  state.newProject.isProjectSaved;

export const selectIsSavingProject = (state: State): boolean =>
  state.newProject.isSavingProject;

// Actions

export const saveProjectAction = createAction('newProject/saveProject');
export const saveProjectSuccessAction = createAction(
  'newProject/saveProjectSuccess'
);
export const saveProjectFailureAction = createAction(
  'newProject/saveProjectFailure'
);

export const saveUpdateAction = createAction(
  'newUpdate/saveUpdate'
).withPayload<string>();
export const saveUpdateSuccessAction = createAction(
  'newUpdate/saveUpdateSuccess'
);
export const saveUpdateFailureAction = createAction(
  'newUpdate/saveUpdateFailure'
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
  const projectId = `${newProject.projectName!.replace(
    /[^a-zA-Z]/g,
    ''
  )}-${now}`;

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

const saveUpdateEpic: NewProjectEpic = (
  action$,
  state$,
  { projectDataService }
) =>
  action$.pipe(
    ofType(saveUpdateAction.type),
    switchMap(action => {
      const projectId = action.payload;
      const update = convertFormDataToUpdateData(
        state$.value.newProject,
        projectId
      );
      return projectDataService.addNewUpdate$(update).pipe(
        mergeMap(() => of(saveUpdateSuccessAction())),
        catchError(e => of(saveUpdateFailureAction()))
      );
    })
  );

function convertFormDataToUpdateData(
  newProject: NewProjectState,
  projectId: string
): ProjectUpdate {
  const now = moment.now();

  const projectOverview = {
    projectName: newProject.projectName!,
    projectGoal: newProject.projectGoal!,
  };
  return {
    updateId: `${now}`,
    timeMillis: now,
    projectId,
    projectLocation: [],
    projectOverview,
  };
}

export const newProjectEpic: NewProjectEpic = combineEpics(
  saveProjectEpic,
  saveUpdateEpic
);

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

  onAction(saveUpdateAction, state => ({
    ...state,
    isSavingProject: true,
    isProjectSaved: false,
  })),

  onAction(saveUpdateSuccessAction, state => ({
    ...state,
    isSavingProject: false,
    isProjectSaved: true,
  })),

  onAction(saveUpdateFailureAction, state => ({
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
