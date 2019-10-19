import { createBrowserHistory } from 'history';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import '../App.css';
import { newProjectPath } from '../routing/routes';
import { selectProjectsNewestUpdateList } from './projectList.redux';
import ProjectListTable from './ProjectListTable';

const history = createBrowserHistory();

const ProjectListContainer = styled.div``;

const ProjectList: FC = () => {
  const updatesList = useSelector(selectProjectsNewestUpdateList);
  return (
    <ProjectListContainer>
      <ProjectListTable data={updatesList} onAddProject={handleOnAddProject} />
    </ProjectListContainer>
  );
};

function handleOnAddProject() {
  history.push(newProjectPath());
}

export default withRouter(ProjectList);
