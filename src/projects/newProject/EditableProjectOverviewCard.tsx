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
import CardContainer from '../../shared/components/CardContainer';
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
    if (overview) {
      dispatch(setNewProjectNameAction(overview.projectName));
      dispatch(setNewProjectGoalAction(overview.projectGoal));
      dispatch(setNewProjectStartDateAction(overview.projectStartDate));
      dispatch(setNewProjectEndDateAction(overview.projectEndDate));
      dispatch(setNewProjectBudgetUrlAction(overview.projectBudgetUrl));
      dispatch(setNewProjectClientUrlAction(overview.projectClientUrl));
    } else {
      dispatch(setNewProjectStartDateAction(moment().valueOf()));
      dispatch(setNewProjectEndDateAction(moment().valueOf()));
    }
  }, [dispatch, overview]);

  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.overview.label')}</SectionTitle>
          <TextFieldContainer>
            <TextField
              required
              fullWidth
              label={i18n.t('project.overview.name')}
              onChange={e =>
                handleOnChangeTextField(e, setNewProjectNameAction)
              }
              value={projectName || ''}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              fullWidth
              label={i18n.t('project.overview.goal')}
              onChange={e =>
                handleOnChangeTextField(e, setNewProjectGoalAction)
              }
              value={projectGoal || ''}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Flex direction="row">
                <KeyboardDatePicker
                  label={i18n.t('project.overview.startDate')}
                  format="dd/MM/yyyy"
                  value={projectStartDate}
                  onChange={date =>
                    handleDateChange(date, setNewProjectStartDateAction)
                  }
                />
                <DatePickerSeparator />
                <KeyboardDatePicker
                  label={i18n.t('project.overview.endDate')}
                  format="dd/MM/yyyy"
                  value={projectEndDate}
                  onChange={date =>
                    handleDateChange(date, setNewProjectEndDateAction)
                  }
                />
              </Flex>
            </MuiPickersUtilsProvider>
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              fullWidth
              label={i18n.t('project.overview.budget')}
              onChange={e =>
                handleOnChangeTextField(e, setNewProjectBudgetUrlAction)
              }
              value={projectBudgetUrl || ''}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              fullWidth
              label={i18n.t('project.overview.client')}
              onChange={e =>
                handleOnChangeTextField(e, setNewProjectClientUrlAction)
              }
              value={projectClientUrl || ''}
            />
          </TextFieldContainer>
        </CardContent>
      </Card>
    </CardContainer>
  );

  function handleOnChangeTextField(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    actionToDispatch: (value: string) => void
  ) {
    dispatch(actionToDispatch(e.target.value));
  }

  function handleDateChange(
    date: Date | null,
    actionToDispatch: (value: number) => void
  ) {
    if (date) {
      dispatch(actionToDispatch(date.getTime()));
    }
  }
};

export default EditableProjectOverviewCard;
