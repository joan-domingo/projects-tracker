import { Card, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../i18n/i18n';
import {
  selectNewProjectGoal,
  selectNewProjectName,
  setProjectGoalAction,
  setProjectNameAction,
} from './newProject.redux';

const ProjectOverview: FC = () => {
  const dispatch = useDispatch();
  const projectName = useSelector(selectNewProjectName);
  const projectGoal = useSelector(selectNewProjectGoal);
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Project Overview</div>
        <TextField
          required
          label={i18n.t('project.overview.name')}
          onChange={handleOnChangeProjectName}
          value={projectName}
        />
        <TextField
          required
          label={i18n.t('project.overview.goal')}
          onChange={handleOnChangeProjectGoal}
          value={projectGoal}
        />
      </CardContent>
    </Card>
  );

  function handleOnChangeProjectName(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setProjectNameAction(e.target.value));
  }

  function handleOnChangeProjectGoal(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setProjectGoalAction(e.target.value));
  }
};

export default ProjectOverview;
