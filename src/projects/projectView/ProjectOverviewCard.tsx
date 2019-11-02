import { Card, CardContent } from '@material-ui/core';
import 'date-fns';
import moment from 'moment';
import React, { FC } from 'react';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import Flex from '../../shared/components/Flex';
import LabeledText from '../../shared/components/LabeledText';
import LabeledUrl from '../../shared/components/LabeledUrl';
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
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.overview.label')}</SectionTitle>
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
              text={moment(data.projectStartDate).format('DD/MM/YYYY')}
            />
            <DateSeparator />
            <LabeledText
              label={i18n.t('project.overview.endDate')}
              text={moment(data.projectEndDate).format('DD/MM/YYYY')}
            />
          </Flex>
          <LabeledUrl
            label={i18n.t('project.overview.budget')}
            url={data.projectBudgetUrl}
          />
          <LabeledUrl
            label={i18n.t('project.overview.client')}
            url={data.projectClientUrl}
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectOverviewCard;
