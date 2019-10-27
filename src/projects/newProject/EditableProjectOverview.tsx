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
import i18n from '../../i18n/i18n';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectOverview } from '../../shared/models/ProjectData';
import {
  selectNewProjectGoal,
  selectNewProjectName,
  setProjectGoalAction,
  setProjectNameAction,
} from './newProject.redux';

const TimeOverviewContainer = styled.div``;

interface Props {
  overview?: ProjectOverview;
}

const EditableProjectOverview: FC<Props> = ({ overview }) => {
  const dispatch = useDispatch();
  const projectName = useSelector(selectNewProjectName);
  const projectGoal = useSelector(selectNewProjectGoal);
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <SectionTitle>{i18n.t('project.overview.label')}</SectionTitle>
        <TextField
          required
          label={i18n.t('project.overview.name')}
          onChange={handleOnChangeProjectName}
          value={defineTextFieldValue(
            projectName,
            overview && overview.projectName
          )}
          onBlur={() =>
            handleOnBlurTextField(
              projectName,
              overview && overview.projectName,
              setProjectNameAction
            )
          }
        />
        <TextField
          required
          label={i18n.t('project.overview.goal')}
          onChange={handleOnChangeProjectGoal}
          value={defineTextFieldValue(
            projectGoal,
            overview && overview.projectGoal
          )}
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

  function handleOnBlurTextField(
    enteredValue: string | undefined,
    defaultValue: string | undefined,
    actionToDispatch: (value: string) => void
  ) {
    return (
      !enteredValue && overview && dispatch(actionToDispatch(defaultValue!))
    );
  }

  function handleOnChangeProjectGoal(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setProjectGoalAction(e.target.value));
  }

  function defineTextFieldValue(
    enteredValue: string | undefined,
    defaultValue: string | undefined
  ): string {
    if (enteredValue || enteredValue === '') {
      return enteredValue;
    }
    return defaultValue || '';
  }
};

export default EditableProjectOverview;
