import { generatePath } from 'react-router';

export const dashboardPath = '/dashboard';
export const newProjectPath = '/projects/new';
export const projectViewPath = '/projects/:projectId';
export const newProjectUpdatePath = '/projects/:projectId/newUpdate';

export const generateProjectViewPath = (projectId: string) =>
  generatePath(projectViewPath, { projectId });

export const generateNewProjectUpdatePath = (projectId: string) =>
  generatePath(newProjectUpdatePath, { projectId });
