import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import '../App.css';
import { logoutAction } from '../auth/auth.redux';
import Button from '../shared/components/Button';
import { addProjectAction, selectProjectList } from './projectList.redux';
import ProjectListTable from './ProjectListTable';

const ProjectListContainer = styled.div``;

const ProjectList: FC = () => {
  const projectList = useSelector(selectProjectList);
  const dispatch = useDispatch();
  return (
    <ProjectListContainer>
      <p>You are now signed In!</p>
      <Button onClick={handleOnClickLogout} label={'Log out'} />
      <ProjectListTable
        data={projectList}
        onAddProject={() => handleOnAddProject()}
      />
    </ProjectListContainer>
  );

  function handleOnAddProject() {
    dispatch(addProjectAction());
  }

  function handleOnClickLogout() {
    dispatch(logoutAction());
  }
};

export default withRouter(ProjectList);
