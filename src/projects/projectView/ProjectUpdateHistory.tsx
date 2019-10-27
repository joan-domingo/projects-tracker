import { Card, CardContent } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { State } from '../../root.redux';
import CardContainer from '../../shared/components/CardContainer';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectUpdate } from '../../shared/models/ProjectData';
import { selectProjectUpdates } from '../projectData.redux';

const ProjectUpdateHistoryContainer = styled.div``;

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
            {_.map(projectUpdates, (update: ProjectUpdate) => (
              <p key={update.updateId}>{moment(update.timeMillis).fromNow()}</p>
            ))}
          </CardContent>
        </Card>
      </CardContainer>
    </ProjectUpdateHistoryContainer>
  );
};

export default ProjectUpdateHistory;
