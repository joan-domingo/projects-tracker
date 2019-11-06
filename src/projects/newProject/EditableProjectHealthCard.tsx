import { Card, CardContent } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
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
          <Rating
            value={teamSatisfaction}
            precision={0.25}
            onChange={(event, newValue) =>
              handleChangeRating(newValue, setNewProjectTeamSatisfactionAction)
            }
          />
          <Rating
            value={clientSatisfaction}
            precision={0.25}
            onChange={(event, newValue) =>
              handleChangeRating(
                newValue,
                setNewProjectClientSatisfactionAction
              )
            }
          />
          <Rating
            value={budgetHealth}
            precision={0.25}
            onChange={(event, newValue) =>
              handleChangeRating(newValue, setNewProjectBudgetHealthAction)
            }
          />
          <Rating
            value={timelineHealth}
            precision={0.25}
            onChange={(event, newValue) =>
              handleChangeRating(newValue, setNewProjectTimelineHealthAction)
            }
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default EditableProjectHealthCard;
