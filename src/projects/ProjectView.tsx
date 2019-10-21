import React, { FC } from 'react';
import styled from 'styled-components';
import { small } from '../shared/styles/dimensions';
import ProjectOverview from './components/ProjectOverview';

const ProjectViewContainer = styled.div``;
const CardContainer = styled.div`
  margin-bottom: ${small};
`;

const ProjectView: FC = () => {
  return (
    <ProjectViewContainer>
      <CardContainer>
        <ProjectOverview />
      </CardContainer>
    </ProjectViewContainer>
  );
};

export default ProjectView;
