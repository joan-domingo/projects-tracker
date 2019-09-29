export interface ProjectCollection {
  [key: string]: Project;
}

export interface Project {
  id: string;
  name: string;
}
