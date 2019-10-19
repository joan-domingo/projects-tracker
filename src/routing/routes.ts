import { generatePath } from 'react-router';

export const dashboard = '/';
export const newProject = '/projects/new';

export const dashboardPath = () => generatePath(dashboard);
export const newProjectPath = () => generatePath(newProject);
