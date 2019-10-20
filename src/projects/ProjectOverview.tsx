import { Card, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import i18n from '../i18n/i18n';
import { setProjectNameAction } from './newProject.redux';

const ProjectOverview: FC = () => {
  const dispatch = useDispatch();
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Project Overview</div>
        <TextField
          required
          label={i18n.t('project.overview.name')}
          onChange={handleOnChangeProjectName}
        />
        <TextField required label={i18n.t('project.overview.goal')} />
      </CardContent>
    </Card>
  );

  function handleOnChangeProjectName(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setProjectNameAction(e.target.value));
  }
};

export default ProjectOverview;
