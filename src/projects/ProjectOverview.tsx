import DateFnsUtils from '@date-io/date-fns';
import { Card, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';
import moment from 'moment';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import i18n from '../i18n/i18n';
import {
  selectNewProjectGoal,
  selectNewProjectName,
  setProjectGoalAction,
  setProjectNameAction,
} from './newProject.redux';

const TimeOverviewContainer = styled.div``;

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
        <TimeOverviewContainer>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              label="Date picker inline"
              value={moment()}
              /* tslint:disable-next-line:no-empty */
              onChange={() => {}}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              label="Date picker inline"
              value={moment()}
              /* tslint:disable-next-line:no-empty */
              onChange={() => {}}
            />
          </MuiPickersUtilsProvider>
        </TimeOverviewContainer>
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
