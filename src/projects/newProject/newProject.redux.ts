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
import {
  Location,
  NewProjectMember,
  Project,
  ProjectRisksOpportunities,
  ProjectUpdate,
} from '../../shared/models/ProjectData';
import { convertNewProjectMembers } from '../../shared/utils/ProjectDataUtils';
import ProjectDataService from '../ProjectDataService';

export interface NewProjectState {
  isSavingProject: boolean;
  isProjectSaved: boolean;
  // Project overview
  projectName?: string;
  projectGoal?: string;
  projectStartDate?: number;
  projectEndDate?: number;
  projectBudgetUrl?: string;
  projectClientUrl?: string;
  // Team
  clientLocation?: string;
  projectMembers: NewProjectMember[];
  projectLocation: Location[];
  // Project health
  teamSatisfaction: number;
  clientSatisfaction: number;
  budgetHealth: number;
  timelineHealth: number;
  // Risks & opportunities
  isActionNeeded: boolean;
  isHelpNeeded: boolean;
  projectOpportunities?: string;
  projectRisks?: string;
}

// Selectors

interface State {
  newProject: NewProjectState;
}

export const selectIsProjectSaved = (state: State): boolean =>
  state.newProject.isProjectSaved;

export const selectIsSavingProject = (state: State): boolean =>
  state.newProject.isSavingProject;

export const selectNewProjectName = (state: State) =>
  state.newProject.projectName;

export const selectNewProjectGoal = (state: State) =>
  state.newProject.projectGoal;

export const selectNewProjectStartDate = (state: State) =>
  state.newProject.projectStartDate;

export const selectNewProjectEndDate = (state: State) =>
  state.newProject.projectEndDate;

export const selectNewProjectBudgetUrl = (state: State) =>
  state.newProject.projectBudgetUrl;

export const selectNewProjectClientUrl = (state: State) =>
  state.newProject.projectClientUrl;

export const selectNewProjectClientLocation = (state: State) =>
  state.newProject.clientLocation;

export const selectNewProjectMembers = (state: State) =>
  state.newProject.projectMembers || [];

export const selectNewProjectLocation = (state: State) =>
  state.newProject.projectLocation || [];

export const selectNewProjectTeamSatisfaction = (state: State) =>
  state.newProject.teamSatisfaction;

export const selectNewProjectClientSatisfaction = (state: State) =>
  state.newProject.clientSatisfaction;

export const selectNewProjectBugetHealth = (state: State) =>
  state.newProject.budgetHealth;

export const selectNewProjectTimelineHealth = (state: State) =>
  state.newProject.timelineHealth;

export const selectNewProjectIsHelpNeeded = (state: State) =>
  state.newProject.isHelpNeeded;

export const selectNewProjectIsActionNeeded = (state: State) =>
  state.newProject.isActionNeeded;

export const selectNewProjectOpportunities = (state: State) =>
  state.newProject.projectOpportunities;

export const selectNewProjectRisks = (state: State) =>
  state.newProject.projectRisks;

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

export const setNewProjectNameAction = createAction(
  'newProject/setProjectName'
).withPayload<string>();

export const setNewProjectGoalAction = createAction(
  'newProject/setProjectGoal'
).withPayload<string>();

export const setNewProjectStartDateAction = createAction(
  'newProject/setProjectStartDate'
).withPayload<number>();

export const setNewProjectEndDateAction = createAction(
  'newProject/setProjectEndDate'
).withPayload<number>();

export const setNewProjectBudgetUrlAction = createAction(
  'newProject/setProjectBudgetUrl'
).withPayload<string>();

export const setNewProjectClientUrlAction = createAction(
  'newProject/setProjectClientUrl'
).withPayload<string>();

export const setNewProjectClientLocationAction = createAction(
  'newProject/setClientLocation'
).withPayload<string>();

export const setNewProjectMembersAction = createAction(
  'newProject/setNewProjectMembers'
).withPayload<NewProjectMember[]>();

export const setNewProjectLocationAction = createAction(
  'newProject/setNewProjectLocation'
).withPayload<Location[]>();

export const setNewProjectTeamSatisfactionAction = createAction(
  'newProject/setNewProjectTeamSatisfactionAction'
).withPayload<number>();

export const setNewProjectClientSatisfactionAction = createAction(
  'newProject/setNewProjectClientSatisfactionAction'
).withPayload<number>();

export const setNewProjectBudgetHealthAction = createAction(
  'newProject/setNewProjectBudgetHealthAction'
).withPayload<number>();

export const setNewProjectTimelineHealthAction = createAction(
  'newProject/setNewProjectTimelineHealth'
).withPayload<number>();

export const setNewProjectIsActionNeededAction = createAction(
  'newProject/setNewProjectIsActionNeeded'
).withPayload<boolean>();

export const setNewProjectIsHelpNeededAction = createAction(
  'newProject/setNewProjectIsHelpNeeded'
).withPayload<boolean>();

export const setNewProjectOpportunitiesAction = createAction(
  'newProject/setNewProjectOpportunities'
).withPayload<string>();

export const setNewProjectRisksAction = createAction(
  'newProject/setNewProjectRisks'
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
    projectGoal: newProject.projectGoal || '',
    projectStartDate: newProject.projectStartDate || moment().valueOf(),
    projectEndDate: newProject.projectEndDate || moment().valueOf(),
    projectBudgetUrl: newProject.projectBudgetUrl || '',
    projectClientUrl: newProject.projectClientUrl || '',
  };

  const projectTeam = {
    projectMembers: convertNewProjectMembers(newProject.projectMembers),
    projectLocation: newProject.projectLocation || [],
    clientLocation: newProject.clientLocation || '',
  };

  const projectHealth = {
    clientSatisfaction: newProject.clientSatisfaction,
    teamSatisfaction: newProject.teamSatisfaction,
    budgetHealth: newProject.budgetHealth,
    timelineHealth: newProject.timelineHealth,
  };

  const projectRisksOpportunities: ProjectRisksOpportunities = {
    isActionNeeded: newProject.isActionNeeded,
    isHelpNeeded: newProject.isHelpNeeded,
    projectOpportunities: newProject.projectOpportunities || '',
    projectRisks: newProject.projectRisks || '',
  };

  const firstUpdate: ProjectUpdate = {
    updateId: `${now}`,
    timeMillis: now,
    projectId,
    projectOverview,
    projectTeam,
    projectHealth,
    projectRisksOpportunities,
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
  newUpdate: NewProjectState,
  projectId: string
): ProjectUpdate {
  const now = moment.now();

  const projectOverview = {
    projectName: newUpdate.projectName || '',
    projectGoal: newUpdate.projectGoal || '',
    projectStartDate: newUpdate.projectStartDate || moment().valueOf(),
    projectEndDate: newUpdate.projectEndDate || moment().valueOf(),
    projectBudgetUrl: newUpdate.projectBudgetUrl || '',
    projectClientUrl: newUpdate.projectClientUrl || '',
  };

  const projectTeam = {
    projectMembers: convertNewProjectMembers(newUpdate.projectMembers),
    projectLocation: newUpdate.projectLocation || [],
    clientLocation: newUpdate.clientLocation || '',
  };

  const projectHealth = {
    clientSatisfaction: newUpdate.clientSatisfaction,
    teamSatisfaction: newUpdate.teamSatisfaction,
    budgetHealth: newUpdate.budgetHealth,
    timelineHealth: newUpdate.timelineHealth,
  };

  const projectRisksOpportunities: ProjectRisksOpportunities = {
    isActionNeeded: newUpdate.isActionNeeded,
    isHelpNeeded: newUpdate.isHelpNeeded,
    projectOpportunities: newUpdate.projectOpportunities || '',
    projectRisks: newUpdate.projectRisks || '',
  };

  return {
    updateId: `${now}`,
    timeMillis: now,
    projectId,
    projectOverview,
    projectTeam,
    projectHealth,
    projectRisksOpportunities,
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
  projectMembers: [],
  projectLocation: [],
  isActionNeeded: false,
  isHelpNeeded: false,
  clientSatisfaction: 0,
  teamSatisfaction: 0,
  budgetHealth: 0,
  timelineHealth: 0,
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

  onAction(setNewProjectNameAction, (state, action) => ({
    ...state,
    projectName: action.payload,
  })),

  onAction(setNewProjectGoalAction, (state, action) => ({
    ...state,
    projectGoal: action.payload,
  })),

  onAction(setNewProjectStartDateAction, (state, action) => ({
    ...state,
    projectStartDate: action.payload,
  })),

  onAction(setNewProjectEndDateAction, (state, action) => ({
    ...state,
    projectEndDate: action.payload,
  })),

  onAction(setNewProjectClientUrlAction, (state, action) => ({
    ...state,
    projectClientUrl: action.payload,
  })),

  onAction(setNewProjectBudgetUrlAction, (state, action) => ({
    ...state,
    projectBudgetUrl: action.payload,
  })),

  onAction(setNewProjectClientLocationAction, (state, action) => ({
    ...state,
    clientLocation: action.payload,
  })),

  onAction(setNewProjectMembersAction, (state, action) => ({
    ...state,
    projectMembers: action.payload,
  })),

  onAction(setNewProjectLocationAction, (state, action) => ({
    ...state,
    projectLocation: action.payload,
  })),

  onAction(setNewProjectTeamSatisfactionAction, (state, action) => ({
    ...state,
    teamSatisfaction: action.payload,
  })),

  onAction(setNewProjectClientSatisfactionAction, (state, action) => ({
    ...state,
    clientSatisfaction: action.payload,
  })),

  onAction(setNewProjectBudgetHealthAction, (state, action) => ({
    ...state,
    budgetHealth: action.payload,
  })),

  onAction(setNewProjectTimelineHealthAction, (state, action) => ({
    ...state,
    timelineHealth: action.payload,
  })),

  onAction(setNewProjectIsActionNeededAction, (state, action) => ({
    ...state,
    isActionNeeded: action.payload,
  })),

  onAction(setNewProjectIsHelpNeededAction, (state, action) => ({
    ...state,
    isHelpNeeded: action.payload,
  })),

  onAction(setNewProjectRisksAction, (state, action) => ({
    ...state,
    projectRisks: action.payload,
  })),

  onAction(setNewProjectOpportunitiesAction, (state, action) => ({
    ...state,
    projectOpportunities: action.payload,
  }))
);
