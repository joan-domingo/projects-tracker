import { Card, CardContent } from '@material-ui/core';
import 'date-fns';
import moment from 'moment';
import React, { FC } from 'react';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import Flex from '../../shared/components/Flex';
import LabeledText from '../../shared/components/LabeledText';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectOverview } from '../../shared/models/ProjectData';
import { large } from '../../shared/styles/dimensions';

const DateSeparator = styled.div`
  width: ${large};
`;

interface Props {
  data: ProjectOverview;
}

const ProjectOverviewCard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <SectionTitle>Project Overview</SectionTitle>
        <LabeledText
          label={i18n.t('project.overview.name')}
          text={data.projectName}
        />
        <LabeledText
          label={i18n.t('project.overview.goal')}
          text={data.projectGoal}
        />
        <Flex direction="row">
          <LabeledText
            label={i18n.t('project.overview.startDate')}
            text={moment(data.projectStartDate).format('L')}
          />
          <DateSeparator />
          <LabeledText
            label={i18n.t('project.overview.endDate')}
            text={moment(data.projectEndDate).format('L')}
          />
        </Flex>
        <LabeledText
          label={i18n.t('project.overview.budget')}
          text={data.projectBudgetUrl}
        />
        <LabeledText
          label={i18n.t('project.overview.client')}
          text={data.projectClientUrl}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewCard;
