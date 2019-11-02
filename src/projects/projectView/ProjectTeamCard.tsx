import { Card, CardContent } from '@material-ui/core';
import 'date-fns';
import React, { FC } from 'react';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import LabeledText from '../../shared/components/LabeledText';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectTeam } from '../../shared/models/ProjectData';
import { convertLocationsToString } from '../../shared/utils/ProjectDataUtils';

interface Props {
  data: ProjectTeam;
}

const ProjectTeamCard: FC<Props> = ({ data }) => {
  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.team.label')}</SectionTitle>
          <LabeledText
            label={i18n.t('project.team.members.label')}
            text={data.projectMembers
              .map(m => `${m.fullName}:${m.role}`)
              .toString()
              .replace(',', '\n')}
          />
          <LabeledText
            label={i18n.t('project.team.location')}
            text={convertLocationsToString(data.projectLocation)}
          />
          <LabeledText
            label={i18n.t('project.team.clientLocation')}
            text={data.clientLocation || ''}
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectTeamCard;
