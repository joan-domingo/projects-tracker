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
  projectName: string;
  timeMillis: number;
}
