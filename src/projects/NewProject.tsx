import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import i18n from '../i18n/i18n';
import Button from '../shared/components/Button';
import { small } from '../shared/styles/dimensions';
import { saveProjectAction } from './newProject.redux';
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
