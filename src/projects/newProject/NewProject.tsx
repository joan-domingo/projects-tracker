import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { dashboardPath } from '../../routing/routes';
import Button from '../../shared/components/Button';
import CardContainer from '../../shared/components/CardContainer';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import EditableProjectOverview from './EditableProjectOverview';
import {
  initializeNewProjectAction,
  saveProjectAction,
  selectIsProjectSaved,
  selectIsSavingProject,
} from './newProject.redux';
import NewProjectBreadcrumbs from './NewProjectBreadcrumbs';
import LoadingPage from '../../shared/components/LoadingPage';

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
  const isSavingProject = useSelector(selectIsSavingProject);

  useEffect(() => {
    if (isProjectSaved) {
      history.replace(dashboardPath);
    }
    return function resetState() {
      dispatch(initializeNewProjectAction());
    };
  }, [history, isProjectSaved, dispatch]);

  if (isSavingProject) {
    return <LoadingPage />;
  }

  return (
    <NewProjectContainer>
      <NavigationButtonsContainer
        buttons={
          <Button
            label={i18n.t('shared.submit')}
            onClick={() => dispatch(saveProjectAction())}
          />
        }
        breadCrumbs={<NewProjectBreadcrumbs />}
      />
      <CardContainer>
        <EditableProjectOverview />
      </CardContainer>

      <ProjectMembersModule />
      <ProjectHealth />
      <NavigationButtonsContainer
        buttons={
          <Button
            label={i18n.t('shared.submit')}
            onClick={() => dispatch(saveProjectAction())}
          />
        }
      />
    </NewProjectContainer>
  );
};

export default NewProject;
