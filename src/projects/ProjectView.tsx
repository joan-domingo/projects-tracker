import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { selectProject } from '../projectList/projectList.redux';
import { State } from '../root.redux';
import { small } from '../shared/styles/dimensions';
import ProjectOverview from './components/ProjectOverview';

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
  const project = useSelector((state: State) =>
    selectProject(state, projectId)
  );
  return (
    <ProjectViewContainer>
      <CardContainer>
        <ProjectOverview project={project} />
      </CardContainer>
    </ProjectViewContainer>
  );
};

export default ProjectView;
