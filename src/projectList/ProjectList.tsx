import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import '../App.css';
import {
  addProjectAction,
  selectProjectsNewestUpdateList,
} from './projectList.redux';
import ProjectListTable from './ProjectListTable';

const ProjectListContainer = styled.div``;

const ProjectList: FC = () => {
  const updatesList = useSelector(selectProjectsNewestUpdateList);
  const dispatch = useDispatch();
  return (
    <ProjectListContainer>
      <ProjectListTable
        data={updatesList}
        onAddProject={() => handleOnAddProject()}
      />
    </ProjectListContainer>
  );

  function handleOnAddProject() {
    dispatch(addProjectAction());
  }
};

export default withRouter(ProjectList);
