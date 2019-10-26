import { Card, CardContent } from '@material-ui/core';
import 'date-fns';
import React, { FC } from 'react';
import i18n from '../../i18n/i18n';
import LabeledText from '../../shared/components/LabeledText';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectOverview } from '../../shared/models/ProjectData';

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
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewCard;
