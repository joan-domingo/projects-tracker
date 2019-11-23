import {
  Location,
  NewProjectMember,
  ProjectMember,
} from '../models/ProjectData';

export const convertNewProjectMembers = (
  newMembers: NewProjectMember[]
): ProjectMember[] => {
  if (!newMembers) {
    return [];
  }
  return newMembers.map(m => ({
    fullName: m.fullName || '',
    role: m.role || '',
  }));
};

export const convertLocationsToString = (locations: Location[]): string => {
  if (!locations) {
    return '';
  }
  return locations.toString().replace(/,/g, ', ');
};
