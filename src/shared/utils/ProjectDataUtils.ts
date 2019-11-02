import {
  Location,
  NewProjectMember,
  ProjectMember,
} from '../models/ProjectData';

export const convertNewProjectMembers = (
  newMembers: NewProjectMember[]
): ProjectMember[] => {
  return newMembers.map(m => ({
    fullName: m.fullName || '',
    role: m.role || '',
  }));
};

export const convertLocationsToString = (locations: Location[]): string => {
  return locations.toString();
};
