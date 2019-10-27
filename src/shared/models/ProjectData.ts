export interface ProjectCollection {
  [key: string]: Project;
}

export interface Project {
  projectId: string;
  updates: ProjectUpdateCollection | undefined;
}

export interface ProjectUpdateCollection {
  [key: string]: ProjectUpdate;
}

export interface ProjectUpdate {
  updateId: string;
  projectId: string;
  timeMillis: number;
  projectOverview: ProjectOverview;
  projectLocation: Location[];
}

export interface ProjectOverview {
  projectName: string;
  projectGoal: string;
  projectStartDate: number;
  projectEndDate: number;
  projectBudgetUrl: string;
  projectClientUrl: string;
}

export type Location =
  | 'Berlin'
  | 'Helsinki'
  | 'London'
  | 'Munich'
  | 'Oslo'
  | 'Stockholm'
  | 'Stuttgart'
  | 'Tampere';
