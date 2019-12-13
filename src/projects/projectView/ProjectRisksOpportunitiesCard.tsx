import { Card, CardContent } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import React, { FC } from 'react';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import Flex from '../../shared/components/Flex';
import { HalfWidthContainer } from '../../shared/components/HalfWidthContainer';
import LabeledText from '../../shared/components/LabeledText';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectRisksOpportunitiesProps } from '../../shared/utils/ProjectDataUtils';

const ProjectRisksOpportunitiesCard: FC<ProjectRisksOpportunitiesProps> = ({
  data,
}) => {
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
          <Flex direction="row">
            <HalfWidthContainer style={{ marginRight: '0.5rem' }}>
              <FormControlLabel
                control={<Radio color="primary" />}
                label={i18n.t('project.risksOpportunities.actionNeeded')}
                checked={data.isActionNeeded}
                disabled={!data.isActionNeeded}
              />
              <LabeledText
                label={i18n.t('project.risksOpportunities.opportunities')}
                text={data.projectOpportunities || ''}
              />
            </HalfWidthContainer>
            <HalfWidthContainer style={{ marginLeft: '0.5rem' }}>
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
            </HalfWidthContainer>
          </Flex>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectRisksOpportunitiesCard;
