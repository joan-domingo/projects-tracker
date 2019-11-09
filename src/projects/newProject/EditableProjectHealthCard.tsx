import { Card, CardContent } from '@material-ui/core';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import LabeledRating from '../../shared/components/LabeledRating';
import SectionTitle from '../../shared/components/SectionTitle';
import { ProjectHealth } from '../../shared/models/ProjectData';
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

interface Props {
  data?: ProjectHealth;
}

const EditableProjectHealthCard: FC<Props> = ({ data }) => {
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
          <LabeledRating
            label={i18n.t('project.health.teamSatisfaction')}
            name="teamSatisfaction"
            value={teamSatisfaction}
            onChange={newValue =>
              handleChangeRating(newValue, setNewProjectTeamSatisfactionAction)
            }
          />
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
          />
          <LabeledRating
            label={i18n.t('project.health.budgetHealth')}
            name="budgetHealth"
            value={budgetHealth}
            onChange={newValue =>
              handleChangeRating(newValue, setNewProjectBudgetHealthAction)
            }
          />
          <LabeledRating
            label={i18n.t('project.health.timelineHealth')}
            name="timelineHealth"
            value={timelineHealth}
            onChange={newValue =>
              handleChangeRating(newValue, setNewProjectTimelineHealthAction)
            }
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default EditableProjectHealthCard;
