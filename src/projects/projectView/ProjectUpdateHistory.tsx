import { Card, CardContent } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { State } from '../../root.redux';
import CardContainer from '../../shared/components/CardContainer';
import LabeledList from '../../shared/components/LabeledList';
import SectionTitle from '../../shared/components/SectionTitle';
import { selectProjectUpdates } from '../projectData.redux';

const ProjectUpdateHistoryContainer = styled.div``;

const Text = styled.div`
  font-size: 1rem;
`;

interface Props {
  projectId: string;
}

const ProjectUpdateHistory: FC<Props> = ({ projectId }) => {
  const projectUpdates = _.chain(
    useSelector((state: State) => selectProjectUpdates(state, projectId))
  )
    .sortBy('timeMillis')
    .reverse()
    .value();
  return (
    <ProjectUpdateHistoryContainer>
      <CardContainer>
        <Card>
          <CardContent>
            <SectionTitle>{i18n.t('projectView.history')}</SectionTitle>
            <LabeledList
              label=""
              items={projectUpdates.map(update => (
                <Text>{moment(update.timeMillis).fromNow()}</Text>
              ))}
            />
          </CardContent>
        </Card>
      </CardContainer>
    </ProjectUpdateHistoryContainer>
  );
};

export default ProjectUpdateHistory;
