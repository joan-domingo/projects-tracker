import DateFnsUtils from '@date-io/date-fns';
import { Card, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';
import moment from 'moment';
import React, { ChangeEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import Flex from '../../shared/components/Flex';
import SectionTitle from '../../shared/components/SectionTitle';
import TextFieldContainer from '../../shared/components/TextFieldContainer';
import { ProjectOverview } from '../../shared/models/ProjectData';
import { large } from '../../shared/styles/dimensions';
import {
  selectNewProjectBudgetUrl,
  selectNewProjectClientUrl,
  selectNewProjectEndDate,
  selectNewProjectGoal,
  selectNewProjectName,
  selectNewProjectStartDate,
  setNewProjectBudgetUrlAction,
  setNewProjectClientUrlAction,
  setNewProjectEndDateAction,
  setNewProjectGoalAction,
  setNewProjectNameAction,
  setNewProjectStartDateAction,
} from './newProject.redux';

const DatePickerSeparator = styled.div`
  width: ${large};
`;

interface Props {
  overview?: ProjectOverview;
}

const EditableProjectOverviewCard: FC<Props> = ({ overview }) => {
  const dispatch = useDispatch();
  const projectName = useSelector(selectNewProjectName);
  const projectGoal = useSelector(selectNewProjectGoal);
  const projectStartDate = useSelector(selectNewProjectStartDate);
  const projectEndDate = useSelector(selectNewProjectEndDate);
  const projectBudgetUrl = useSelector(selectNewProjectBudgetUrl);
  const projectClientUrl = useSelector(selectNewProjectClientUrl);

  useEffect(() => {
    if (!overview) {
      dispatch(setNewProjectStartDateAction(moment().valueOf()));
      dispatch(setNewProjectEndDateAction(moment().valueOf()));
    }
  }, [dispatch, overview]);

  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <SectionTitle>{i18n.t('project.overview.label')}</SectionTitle>
        <TextFieldContainer>
          <TextField
            required
            fullWidth
            label={i18n.t('project.overview.name')}
            onChange={e => handleOnChangeTextField(e, setNewProjectNameAction)}
            value={defineTextFieldValue(
              projectName,
              overview && overview.projectName
            )}
            onBlur={() =>
              handleOnBlurTextField(
                projectName,
                overview && overview.projectName,
                setNewProjectNameAction
              )
            }
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            required
            fullWidth
            label={i18n.t('project.overview.goal')}
            onChange={e => handleOnChangeTextField(e, setNewProjectGoalAction)}
            value={defineTextFieldValue(
              projectGoal,
              overview && overview.projectGoal
            )}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Flex direction="row">
              <KeyboardDatePicker
                required
                label={i18n.t('project.overview.startDate')}
                format="dd/MM/yyyy"
                value={defineDate(
                  projectStartDate,
                  overview && overview.projectStartDate
                )}
                onChange={date =>
                  handleDateChange(date, setNewProjectStartDateAction)
                }
              />
              <DatePickerSeparator />
              <KeyboardDatePicker
                required
                label={i18n.t('project.overview.endDate')}
                format="dd/MM/yyyy"
                value={defineDate(
                  projectEndDate,
                  overview && overview.projectEndDate
                )}
                onChange={date =>
                  handleDateChange(date, setNewProjectEndDateAction)
                }
              />
            </Flex>
          </MuiPickersUtilsProvider>
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            required
            fullWidth
            label={i18n.t('project.overview.budget')}
            onChange={e =>
              handleOnChangeTextField(e, setNewProjectBudgetUrlAction)
            }
            value={defineTextFieldValue(
              projectBudgetUrl,
              overview && overview.projectBudgetUrl
            )}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            required
            fullWidth
            label={i18n.t('project.overview.client')}
            onChange={e =>
              handleOnChangeTextField(e, setNewProjectClientUrlAction)
            }
            value={defineTextFieldValue(
              projectClientUrl,
              overview && overview.projectClientUrl
            )}
          />
        </TextFieldContainer>
      </CardContent>
    </Card>
  );

  function handleOnChangeTextField(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    actionToDispatch: (value: string) => void
  ) {
    dispatch(actionToDispatch(e.target.value));
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

  function defineTextFieldValue(
    enteredValue: string | undefined,
    defaultValue: string | undefined
  ): string {
    if (enteredValue || enteredValue === '') {
      return enteredValue;
    }
    return defaultValue || '';
  }

  function handleDateChange(
    date: Date | null,
    actionToDispatch: (value: number) => void
  ) {
    if (date) {
      dispatch(actionToDispatch(date.getTime()));
    }
  }

  function defineDate(
    enteredDate: number | undefined,
    defaultDate: number | undefined
  ) {
    if (enteredDate) {
      return moment(enteredDate);
    }
    return moment(defaultDate);
  }
};

export default EditableProjectOverviewCard;
