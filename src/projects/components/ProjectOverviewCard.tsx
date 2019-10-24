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
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { ProjectOverview } from '../../shared/models/ProjectData';

const TimeOverviewContainer = styled.div``;

interface Props {
  data: ProjectOverview;
}

const ProjectOverviewCard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Project Overview</div>
        <TextField
          required
          label={i18n.t('project.overview.name')}
          value={data.projectName}
          disabled
        />
        <TextField
          required
          label={i18n.t('project.overview.goal')}
          value={data.projectGoal}
          disabled
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
};

export default ProjectOverviewCard;
