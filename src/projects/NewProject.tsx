import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../i18n/i18n';
import Button from '../shared/components/Button';
import { small } from '../shared/styles/dimensions';
import {
  initializeNewProjectAction,
  saveProjectAction,
  selectIsProjectSaved,
} from './newProject.redux';
import ProjectOverview from './ProjectOverview';

const NewProjectContainer = styled.div``;
const CardContainer = styled.div`
  margin-bottom: ${small};
`;

const ProjectMembersModule = () => (
  <CardContainer>
    <Card>
      <CardContent>Project Members</CardContent>
    </Card>
  </CardContainer>
);

const ProjectHealth = () => (
  <CardContainer>
    <Card>
      <CardContent>Project Health</CardContent>
    </Card>
  </CardContainer>
);

const NewProject: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isProjectSaved = useSelector(selectIsProjectSaved);

  useEffect(() => {
    dispatch(initializeNewProjectAction());
  }, [dispatch]);

  useEffect(() => {
    if (isProjectSaved) {
      history.goBack();
      dispatch(initializeNewProjectAction());
    }
  }, [history, isProjectSaved, dispatch]);

  return (
    <NewProjectContainer>
      <CardContainer>
        <ProjectOverview />
      </CardContainer>

      <ProjectMembersModule />
      <ProjectHealth />
      <Button
        label={i18n.t('shared.submit')}
        onClick={() => dispatch(saveProjectAction())}
      />
    </NewProjectContainer>
  );
};

export default NewProject;
