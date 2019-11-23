import { Card, CardContent } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import Flex from '../../shared/components/Flex';
import LabeledList from '../../shared/components/LabeledList';
import LabeledText from '../../shared/components/LabeledText';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectTeam } from '../../shared/models/ProjectData';
import { darkGray } from '../../shared/styles/colors';
import { convertLocationsToString } from '../../shared/utils/ProjectDataUtils';

const Text = styled.div`
  font-size: 1rem;
`;

const Member = styled.div`
  display: inline;
`;

const Role = styled.div`
  display: inline;
  color: ${darkGray};
`;

interface Props {
  data: ProjectTeam;
}

const ProjectTeamCard: FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.team.label')}</SectionTitle>
          <Flex direction="row">
            <Flex style={{ width: '50%' }}>
              <LabeledList
                label={i18n.t('project.team.members.label')}
                items={
                  data.projectMembers &&
                  data.projectMembers.map(m => (
                    <Text>
                      <Member>{m.fullName}</Member> <Role>{m.role}</Role>
                    </Text>
                  ))
                }
              />
            </Flex>
            <Flex style={{ width: '50%' }}>
              <LabeledText
                label={i18n.t('project.team.location')}
                text={convertLocationsToString(data.projectLocation)}
              />
              <LabeledText
                label={i18n.t('project.team.clientLocation')}
                text={data.clientLocation || ''}
              />
            </Flex>
          </Flex>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default ProjectTeamCard;
