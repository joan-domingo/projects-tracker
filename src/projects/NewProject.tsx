import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import i18n from '../i18n/i18n';
import { addProjectAction } from '../projectList/projectList.redux';
import Button from '../shared/components/Button';
import { small } from '../shared/styles/dimensions';

const NewProjectContainer = styled.div``;
const CardContainer = styled.div`
  margin-bottom: ${small};
`;

const ProjectOverviewModule = () => (
  <CardContainer>
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Project Overview</div>
        <TextField required label={i18n.t('project.overview.name')} />
        <TextField required label={i18n.t('project.overview.goal')} />
      </CardContent>
    </Card>
  </CardContainer>
);

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
  return (
    <NewProjectContainer>
      <ProjectOverviewModule />
      <ProjectMembersModule />
      <ProjectHealth />
      <Button
        label={i18n.t('shared.submit')}
        onClick={() => dispatch(addProjectAction())}
      />
    </NewProjectContainer>
  );
};

export default withRouter(NewProject);
