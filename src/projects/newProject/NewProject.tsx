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
import LoadingPage from '../../shared/components/LoadingPage';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import EditableProjectOverviewCard from './EditableProjectOverviewCard';
import EditableProjectRisksOpportunitiesCard from './EditableProjectRisksOpportunitiesCard';
import EditableProjectTeamCard from './EditableProjectTeamCard';
import {
  initializeNewProjectAction,
  saveProjectAction,
  selectIsProjectSaved,
  selectIsSavingProject,
  selectNewProjectName,
} from './newProject.redux';
import NewProjectBreadcrumbs from './NewProjectBreadcrumbs';

const NewProjectContainer = styled.div``;

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
  const newProjectName = useSelector(selectNewProjectName);

  useEffect(() => {
    if (isProjectSaved) {
      history.replace(dashboardPath);
    }
    return function resetState() {
      dispatch(initializeNewProjectAction());
    };
  }, [history, isProjectSaved, dispatch]);

  const NavigationBar = (
    <NavigationButtonsContainer
      buttons={
        <Button
          label={i18n.t('shared.submit')}
          onClick={() => dispatch(saveProjectAction())}
          disabled={!newProjectName}
        />
      }
      breadCrumbs={<NewProjectBreadcrumbs />}
    />
  );

  if (isSavingProject) {
    return <LoadingPage />;
  }

  return (
    <NewProjectContainer>
      {NavigationBar}
      <EditableProjectOverviewCard />
      <EditableProjectTeamCard />
      <ProjectHealth />
      <EditableProjectRisksOpportunitiesCard />
      {NavigationBar}
    </NewProjectContainer>
  );
};

export default NewProject;
