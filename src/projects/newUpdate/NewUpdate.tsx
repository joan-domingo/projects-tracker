import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { State } from '../../root.redux';
import { generateProjectViewPath } from '../../routing/routes';
import Button from '../../shared/components/Button';
import CardContainer from '../../shared/components/CardContainer';
import LoadingPage from '../../shared/components/LoadingPage';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import EditableProjectOverviewCard from '../newProject/EditableProjectOverviewCard';
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

  if (!projectUpdate || isSavingUpdate) {
    return <LoadingPage />;
  }

  return (
    <NewUpdateContainer>
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
      <CardContainer>
        <EditableProjectOverviewCard overview={projectUpdate.projectOverview} />
      </CardContainer>
    </NewUpdateContainer>
  );

  function handleSubmitNewUpdate() {
    dispatch(saveUpdateAction(projectId));
  }
};

export default NewUpdate;
