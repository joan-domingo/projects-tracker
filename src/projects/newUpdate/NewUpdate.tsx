import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { State } from '../../root.redux';
import Button from '../../shared/components/Button';
import CardContainer from '../../shared/components/CardContainer';
import LoadingPage from '../../shared/components/LoadingPage';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import EditableProjectOverview from '../newProject/EditableProjectOverview';
import { saveUpdateAction } from '../newProject/newProject.redux';
import { selectLastProjectUpdate } from '../projectData.redux';

const NewUpdateContainer = styled.div``;

interface ProjectViewRouteParams {
  projectId: string;
}

type Props = RouteComponentProps<ProjectViewRouteParams>;

const NewUpdate: FC<Props> = props => {
  const dispatch = useDispatch();
  const { projectId } = props.match.params;
  const projectUpdate = useSelector((state: State) =>
    selectLastProjectUpdate(state, projectId)
  );
  if (!projectUpdate) {
    return <LoadingPage />;
  }
  return (
    <NewUpdateContainer>
      <NavigationButtonsContainer>
        <Button
          onClick={handleSubmitNewUpdate}
          label={i18n.t('shared.submit')}
        />
      </NavigationButtonsContainer>
      <CardContainer>
        <EditableProjectOverview overview={projectUpdate.projectOverview} />
      </CardContainer>
    </NewUpdateContainer>
  );

  function handleSubmitNewUpdate() {
    dispatch(saveUpdateAction(projectId));
  }
};

export default NewUpdate;
