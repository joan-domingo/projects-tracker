import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { State } from '../../root.redux';
import { generateNewProjectUpdatePath } from '../../routing/routes';
import Button from '../../shared/components/Button';
import LoadingPage from '../../shared/components/LoadingPage';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import { selectLastProjectUpdate } from '../projectData.redux';
import ProjectOverviewCard from './ProjectOverviewCard';
import ProjectRisksOpportunitiesCard from './ProjectRisksOpportunitiesCard';
import ProjectTeamCard from './ProjectTeamCard';
import ProjectUpdateHistory from './ProjectUpdateHistory';
import ProjectViewBreadcrumbs from './ProjectViewBreadcrumbs';

const ProjectViewContainer = styled.div``;

interface ProjectViewRouteParams {
  projectId: string;
}

type Props = RouteComponentProps<ProjectViewRouteParams>;

const ProjectView: FC<Props> = props => {
  const history = useHistory();
  const { projectId } = props.match.params;
  const projectUpdate = useSelector((state: State) =>
    selectLastProjectUpdate(state, projectId)
  );
  if (!projectUpdate) {
    return <LoadingPage />;
  }

  const NavigationBar = (
    <NavigationButtonsContainer
      breadCrumbs={
        <ProjectViewBreadcrumbs
          projectName={projectUpdate.projectOverview.projectName}
        />
      }
      buttons={
        <Button
          onClick={handleClickNewUpdate}
          label={i18n.t('projectView.newUpdate')}
        />
      }
    />
  );

  return (
    <ProjectViewContainer>
      {NavigationBar}
      <ProjectOverviewCard data={projectUpdate.projectOverview} />
      <ProjectTeamCard data={projectUpdate.projectTeam} />
      <ProjectRisksOpportunitiesCard
        data={projectUpdate.projectRisksOpportunities}
      />
      <ProjectUpdateHistory projectId={projectId} />
      {NavigationBar}
    </ProjectViewContainer>
  );

  function handleClickNewUpdate() {
    history.push(generateNewProjectUpdatePath(projectId));
  }
};

export default ProjectView;
