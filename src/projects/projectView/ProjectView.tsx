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
  return (
    <ProjectViewContainer>
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
      <ProjectOverviewCard data={projectUpdate.projectOverview} />
      <ProjectTeamCard data={projectUpdate.projectTeam} />
      <ProjectUpdateHistory projectId={projectId} />
    </ProjectViewContainer>
  );

  function handleClickNewUpdate() {
    history.push(generateNewProjectUpdatePath(projectId));
  }
};

export default ProjectView;
