import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { newProjectPath } from '../../routing/routes';
import { selectProjectsNewestUpdateList } from '../projectData.redux';
import ProjectListTable from './ProjectListTable';

const ProjectListContainer = styled.div``;

const ProjectList: FC = () => {
  const history = useHistory();
  const updatesList = useSelector(selectProjectsNewestUpdateList);
  return (
    <ProjectListContainer>
      <ProjectListTable data={updatesList} onAddProject={handleOnAddProject} />
    </ProjectListContainer>
  );

  function handleOnAddProject() {
    history.push(newProjectPath);
  }
};

export default ProjectList;
