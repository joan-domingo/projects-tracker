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

export type Location =
  | 'Berlin'
  | 'Helsinki'
  | 'London'
  | 'Munich'
  | 'Oslo'
  | 'Stockholm'
  | 'Stuttgart'
  | 'Tampere';

export interface ProjectUpdate {
  updateId: string;
  projectId: string;
  projectName: string;
  timeMillis: number;
  projectLocation: Location[];
}
