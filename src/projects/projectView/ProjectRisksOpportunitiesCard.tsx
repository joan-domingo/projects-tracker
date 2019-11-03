import { Card, CardContent } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import React, { FC } from 'react';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import LabeledText from '../../shared/components/LabeledText';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectRisksOpportunities } from '../../shared/models/ProjectData';

interface Props {
  data: ProjectRisksOpportunities;
}

const ProjectRisksOpportunitiesCard: FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>
            {i18n.t('project.risksOpportunities.label')}
          </SectionTitle>
          <FormControlLabel
            control={<Radio color="primary" />}
            label={i18n.t('project.risksOpportunities.actionNeeded')}
            checked={data.isActionNeeded}
            disabled={!data.isActionNeeded}
          />
          <FormControlLabel
            control={<Radio />}
            label={i18n.t('project.risksOpportunities.helpNeeded')}
            checked={data.isHelpNeeded}
            disabled={!data.isHelpNeeded}
          />
          <LabeledText
            label={i18n.t('project.risksOpportunities.risks')}
            text={data.projectRisks || ''}
          />
          <LabeledText
            label={i18n.t('project.risksOpportunities.opportunities')}
            text={data.projectOpportunities || ''}
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectRisksOpportunitiesCard;
