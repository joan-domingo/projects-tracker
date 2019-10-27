import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { newProjectPath } from '../../routing/routes';
import Button from '../../shared/components/Button';
import NavigationButtonsContainer from '../../shared/components/NavigationButtonsContainer';
import { selectProjectsNewestUpdateList } from '../projectData.redux';
import ProjectListTable from './ProjectListTable';

const ProjectListContainer = styled.div``;

const ProjectList: FC = () => {
  const history = useHistory();
  const updatesList = useSelector(selectProjectsNewestUpdateList);
  return (
    <ProjectListContainer>
      <NavigationButtonsContainer>
        <Button
          onClick={handleCreateNewProject}
          label={i18n.t('projectList.addProject')}
        />
      </NavigationButtonsContainer>
      <ProjectListTable data={updatesList} />
    </ProjectListContainer>
  );

  function handleCreateNewProject() {
    history.push(newProjectPath);
  }
};

export default ProjectList;
