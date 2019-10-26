import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { State } from '../../root.redux';
import LoadingPage from '../../shared/components/LoadingPage';
import { small } from '../../shared/styles/dimensions';
import { selectLastProjectUpdate } from '../projectData.redux';
import ProjectOverviewCard from './ProjectOverviewCard';

const ProjectViewContainer = styled.div``;
const CardContainer = styled.div`
  margin-bottom: ${small};
`;

interface ProjectViewRouteParams {
  projectId: string;
}

type Props = RouteComponentProps<ProjectViewRouteParams>;

const ProjectView: FC<Props> = props => {
  const { projectId } = props.match.params;
  const projectUpdate = useSelector((state: State) =>
    selectLastProjectUpdate(state, projectId)
  );
  if (!projectUpdate) {
    return <LoadingPage />;
  }
  return (
    <ProjectViewContainer>
      <CardContainer>
        <ProjectOverviewCard data={projectUpdate.projectOverview} />
      </CardContainer>
    </ProjectViewContainer>
  );
};

export default ProjectView;
