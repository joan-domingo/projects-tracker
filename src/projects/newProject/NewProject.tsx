import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import Button from '../../shared/components/Button';
import CardContainer from '../../shared/components/CardContainer';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import EditableProjectOverview from './EditableProjectOverview';
import {
  initializeNewProjectAction,
  saveProjectAction,
  selectIsProjectSaved,
} from './newProject.redux';

const NewProjectContainer = styled.div``;

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
      <NavigationButtonsContainer>
        <Button
          label={i18n.t('shared.submit')}
          onClick={() => dispatch(saveProjectAction())}
        />
      </NavigationButtonsContainer>
      <CardContainer>
        <EditableProjectOverview />
      </CardContainer>

      <ProjectMembersModule />
      <ProjectHealth />
      <NavigationButtonsContainer>
        <Button
          label={i18n.t('shared.submit')}
          onClick={() => dispatch(saveProjectAction())}
        />
      </NavigationButtonsContainer>
    </NewProjectContainer>
  );
};

export default NewProject;
