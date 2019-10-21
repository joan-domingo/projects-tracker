import { generatePath } from 'react-router';

export const dashboardPath = '/dashboard';
export const newProjectPath = '/projects/new';
export const projectViewPath = '/projects/:projectId';

export const generateProjectViewPath = (projectId: string) =>
  generatePath(projectViewPath, { projectId });
