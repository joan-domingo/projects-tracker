import { Card, CardContent } from '@material-ui/core';
import React, { FC, useCallback, useEffect } from 'react';
import { Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import Flex from '../../shared/components/Flex';
import LabeledRating from '../../shared/components/LabeledRating';
import SectionTitle from '../../shared/components/SectionTitle';
import {
  budgetHealthColor,
  clientSatisfactionColor,
  darkGray,
  teamSatisfactionColor,
  timelineHealthColor,
} from '../../shared/styles/colors';
import { normal, small } from '../../shared/styles/dimensions';
import {
  ProjectHealthProps,
  projectHealthPropsValuesAreEqual,
} from '../../shared/utils/ProjectDataUtils';
import {
  selectNewProjectBugetHealth,
  selectNewProjectClientSatisfaction,
  selectNewProjectTeamSatisfaction,
  selectNewProjectTimelineHealth,
  setNewProjectBudgetHealthAction,
  setNewProjectClientSatisfactionAction,
  setNewProjectTeamSatisfactionAction,
  setNewProjectTimelineHealthAction,
} from './newProject.redux';

const MultilineText = styled.div`
  white-space: pre-line;
  padding: ${small} 0 ${small} ${normal};
  color: ${darkGray};
`;

const EditableProjectHealthCard: FC<ProjectHealthProps> = ({ data }) => {
  const dispatch = useDispatch();
  const teamSatisfaction = useSelector(selectNewProjectTeamSatisfaction);
  const clientSatisfaction = useSelector(selectNewProjectClientSatisfaction);
  const budgetHealth = useSelector(selectNewProjectBugetHealth);
  const timelineHealth = useSelector(selectNewProjectTimelineHealth);

  useEffect(() => {
    if (data) {
      dispatch(setNewProjectClientSatisfactionAction(data.clientSatisfaction));
      dispatch(setNewProjectTeamSatisfactionAction(data.teamSatisfaction));
      dispatch(setNewProjectBudgetHealthAction(data.budgetHealth));
      dispatch(setNewProjectTimelineHealthAction(data.timelineHealth));
    }
  }, [dispatch, data]);

  const handleChangeRating = useCallback(
    (newValue: number, actionToDispatch: (value: number) => void) => {
      dispatch(actionToDispatch(newValue));
    },
    [dispatch]
  );

  return (
    <CardContainer>
      <Card>
        <CardContent>
          <SectionTitle>{i18n.t('project.health.label')}</SectionTitle>
          <Flex direction="row">
            <LabeledRating
              label={i18n.t('project.health.teamSatisfaction')}
              name="teamSatisfaction"
              value={teamSatisfaction}
              onChange={newValue =>
                handleChangeRating(
                  newValue,
                  setNewProjectTeamSatisfactionAction
                )
              }
              color={teamSatisfactionColor}
            />
            <MultilineText>
              <Trans i18nKey="project.health.teamSatisfactionHint">
                0: Unsatisfied - 5: Very Satisfied\nThink about the next 5 key
                dynamics before rating the satisfaction: \n\n1.{' '}
                <strong>Psychological safety</strong>: Can we take risks on this
                team without feeling insecure or embarrassed? \n2.{' '}
                <strong>Dependability</strong>: Can we count on each other to do
                high quality work on time? \n3.{' '}
                <strong>Structure & clarity</strong>: Are goals, roles, and
                execution plans on our team clear? \n4.{' '}
                <strong>Meaning of work</strong>: Are we working on something
                that is personally important for each of us? \n5.{' '}
                <strong>Impact of work</strong>: Do we fundamentally believe
                that the work we’re doing matters?
              </Trans>
            </MultilineText>
          </Flex>
          <Flex direction="row">
            <LabeledRating
              label={i18n.t('project.health.clientSatisfaction')}
              name="clientSatisfaction"
              value={clientSatisfaction}
              onChange={newValue =>
                handleChangeRating(
                  newValue,
                  setNewProjectClientSatisfactionAction
                )
              }
              color={clientSatisfactionColor}
            />
            <MultilineText>
              {i18n.t('project.health.clientSatisfactionHint')}
            </MultilineText>
          </Flex>
          <Flex direction="row">
            <LabeledRating
              label={i18n.t('project.health.budgetHealth')}
              name="budgetHealth"
              value={budgetHealth}
              onChange={newValue =>
                handleChangeRating(newValue, setNewProjectBudgetHealthAction)
              }
              color={budgetHealthColor}
            />
            <MultilineText>
              {i18n.t('project.health.budgetHealthHint')}
            </MultilineText>
          </Flex>
          <Flex direction="row">
            <LabeledRating
              label={i18n.t('project.health.timelineHealth')}
              name="timelineHealth"
              value={timelineHealth}
              onChange={newValue =>
                handleChangeRating(newValue, setNewProjectTimelineHealthAction)
              }
              color={timelineHealthColor}
            />
            <MultilineText>
              {i18n.t('project.health.timelineHealthHint')}
            </MultilineText>
          </Flex>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default React.memo(
  EditableProjectHealthCard,
  projectHealthPropsValuesAreEqual
);
