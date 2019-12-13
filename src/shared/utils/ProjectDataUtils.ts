import _ from 'lodash';
import {
  Location,
  NewProjectMember,
  ProjectHealth,
  ProjectMember,
  ProjectOverview,
  ProjectRisksOpportunities,
  ProjectTeam,
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

export interface ProjectOverviewProps {
  data?: ProjectOverview;
}

export function projectOverviewPropsValuesAreEqual(
  prevProps: ProjectOverviewProps,
  nextProps: ProjectOverviewProps
) {
  return (
    prevProps.data?.projectName === nextProps.data?.projectName &&
    prevProps.data?.projectGoal === nextProps.data?.projectGoal &&
    prevProps.data?.projectStartDate === nextProps.data?.projectStartDate &&
    prevProps.data?.projectEndDate === nextProps.data?.projectEndDate &&
    prevProps.data?.projectBudgetUrl === nextProps.data?.projectBudgetUrl &&
    prevProps.data?.projectClientUrl === nextProps.data?.projectClientUrl
  );
}

export interface ProjectHealthProps {
  data?: ProjectHealth;
}

export function projectHealthPropsValuesAreEqual(
  prevProps: ProjectHealthProps,
  nextProps: ProjectHealthProps
) {
  return (
    prevProps.data?.teamSatisfaction === nextProps.data?.teamSatisfaction &&
    prevProps.data?.clientSatisfaction === nextProps.data?.clientSatisfaction &&
    prevProps.data?.budgetHealth === nextProps.data?.budgetHealth &&
    prevProps.data?.timelineHealth === nextProps.data?.timelineHealth
  );
}

export interface ProjectRisksOpportunitiesProps {
  data?: ProjectRisksOpportunities;
}

export function projectRisksOpportunitiesPropsValuesAreEqual(
  prevProps: ProjectRisksOpportunitiesProps,
  nextProps: ProjectRisksOpportunitiesProps
) {
  return (
    prevProps.data?.isActionNeeded === nextProps.data?.isActionNeeded &&
    prevProps.data?.isHelpNeeded === nextProps.data?.isHelpNeeded &&
    prevProps.data?.projectOpportunities ===
      nextProps.data?.projectOpportunities &&
    prevProps.data?.projectRisks === nextProps.data?.projectRisks
  );
}

export interface ProjectTeamProps {
  data?: ProjectTeam;
}

export function projectTeamPropsValuesAreEqual(
  prevProps: ProjectTeamProps,
  nextProps: ProjectTeamProps
) {
  return (
    _.isEqual(prevProps.data?.clientLocation, nextProps.data?.clientLocation) &&
    _.isEqual(
      prevProps.data?.projectLocation,
      nextProps.data?.projectLocation
    ) &&
    prevProps.data?.clientLocation === nextProps.data?.clientLocation
  );
}
