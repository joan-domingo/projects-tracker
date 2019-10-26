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
import { small } from '../../shared/styles/dimensions';
import { selectLastProjectUpdate } from '../projectData.redux';
import ProjectOverviewCard from './ProjectOverviewCard';

const ProjectViewContainer = styled.div``;
const CardContainer = styled.div`
  margin-bottom: ${small};
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
`;

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
      <ButtonsContainer>
        <Button
          onClick={handleClickNewUpdate}
          label={i18n.t('projectView.newUpdate')}
        />
      </ButtonsContainer>
      <CardContainer>
        <ProjectOverviewCard data={projectUpdate.projectOverview} />
      </CardContainer>
    </ProjectViewContainer>
  );

  function handleClickNewUpdate() {
    history.push(generateNewProjectUpdatePath(projectId));
  }
};

export default ProjectView;
