import { Card, CardContent } from '@material-ui/core';
import React, { FC } from 'react';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
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
          <LabeledRating
            label={i18n.t('project.health.teamSatisfaction')}
            name="teamSatisfaction"
            value={data.teamSatisfaction}
          />
          <LabeledRating
            label={i18n.t('project.health.clientSatisfaction')}
            name="clientSatisfaction"
            value={data.clientSatisfaction}
          />
          <LabeledRating
            label={i18n.t('project.health.budgetHealth')}
            name="budgetHealth"
            value={data.budgetHealth}
          />
          <LabeledRating
            label={i18n.t('project.health.timelineHealth')}
            name="timelineHealth"
            value={data.timelineHealth}
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectHealthCard;
