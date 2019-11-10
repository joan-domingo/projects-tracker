import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { State } from '../../root.redux';
import { generateProjectViewPath } from '../../routing/routes';
import Button from '../../shared/components/Button';
import LoadingPage from '../../shared/components/LoadingPage';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import EditableProjectHealthCard from '../newProject/EditableProjectHealthCard';
import EditableProjectOverviewCard from '../newProject/EditableProjectOverviewCard';
import EditableProjectRisksOpportunitiesCard from '../newProject/EditableProjectRisksOpportunitiesCard';
import EditableProjectTeamCard from '../newProject/EditableProjectTeamCard';
import {
  initializeNewProjectAction,
  saveUpdateAction,
  selectIsProjectSaved,
  selectIsSavingProject,
} from '../newProject/newProject.redux';
import { selectLastProjectUpdate } from '../projectData.redux';
import NewUpdateBreadcrumbs from './NewUpdateBreadcrumbs';

const NewUpdateContainer = styled.div``;

interface ProjectViewRouteParams {
  projectId: string;
}

type Props = RouteComponentProps<ProjectViewRouteParams>;

const NewUpdate: FC<Props> = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { projectId } = props.match.params;
  const projectUpdate = useSelector((state: State) =>
    selectLastProjectUpdate(state, projectId)
  );
  const isUpdateSaved = useSelector(selectIsProjectSaved);
  const isSavingUpdate = useSelector(selectIsSavingProject);

  useEffect(() => {
    if (isUpdateSaved) {
      history.replace(generateProjectViewPath(projectId));
    }
    return function resetState() {
      dispatch(initializeNewProjectAction());
    };
  }, [history, isUpdateSaved, dispatch, projectId]);

  const handleSubmitNewUpdate = useCallback(() => {
    dispatch(saveUpdateAction(projectId));
  }, [dispatch, projectId]);

  if (!projectUpdate || isSavingUpdate) {
    return <LoadingPage />;
  }

  const NavigationBar = (
    <NavigationButtonsContainer
      buttons={
        <Button
          onClick={handleSubmitNewUpdate}
          label={i18n.t('shared.submit')}
        />
      }
      breadCrumbs={
        <NewUpdateBreadcrumbs
          projectName={projectUpdate.projectOverview.projectName}
          projectId={projectId}
        />
      }
    />
  );

  return (
    <NewUpdateContainer>
      {NavigationBar}
      <EditableProjectOverviewCard overview={projectUpdate.projectOverview} />
      <EditableProjectTeamCard team={projectUpdate.projectTeam} />
      <EditableProjectHealthCard data={projectUpdate.projectHealth} />
      <EditableProjectRisksOpportunitiesCard
        data={projectUpdate.projectRisksOpportunities}
      />
      {NavigationBar}
    </NewUpdateContainer>
  );
};

export default NewUpdate;
