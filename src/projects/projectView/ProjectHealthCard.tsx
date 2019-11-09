import { Card, CardContent } from '@material-ui/core';
import React, { FC } from 'react';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import Flex from '../../shared/components/Flex';
import LabeledRating from '../../shared/components/LabeledRating';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectHealth } from '../../shared/models/ProjectData';

interface Props {
  data: ProjectHealth;
}

const ProjectHealthCard: FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.health.label')}</SectionTitle>
          <Flex direction="row">
            <Flex flexGrow={1}>
              <LabeledRating
                label={i18n.t('project.health.teamSatisfaction')}
                value={data.teamSatisfaction}
              />
            </Flex>
            <Flex flexGrow={1}>
              <LabeledRating
                label={i18n.t('project.health.budgetHealth')}
                value={data.budgetHealth}
              />
            </Flex>
          </Flex>
          <Flex direction="row">
            <Flex flexGrow={1}>
              <LabeledRating
                label={i18n.t('project.health.clientSatisfaction')}
                value={data.clientSatisfaction}
              />
            </Flex>
            <Flex flexGrow={1}>
              <LabeledRating
                label={i18n.t('project.health.timelineHealth')}
                value={data.timelineHealth}
              />
            </Flex>
          </Flex>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectHealthCard;
