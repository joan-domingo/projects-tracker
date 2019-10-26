import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { State } from '../../root.redux';
import CardContainer from '../../shared/components/CardContainer';
import LoadingPage from '../../shared/components/LoadingPage';
import EditableProjectOverview from '../newProject/EditableProjectOverview';
import { selectLastProjectUpdate } from '../projectData.redux';
import Button from '../../shared/components/Button';
import i18n from '../../i18n/i18n';
import { saveUpdateAction } from '../newProject/newProject.redux';

const NewUpdateContainer = styled.div``;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
`;

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
      <ButtonsContainer>
        <Button
          onClick={handleSubmitNewUpdate}
          label={i18n.t('shared.submit')}
        />
      </ButtonsContainer>
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
