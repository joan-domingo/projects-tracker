import { Card, CardContent } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import SectionTitle from '../../shared/components/SectionTitle';
import TextFieldContainer from '../../shared/components/TextFieldContainer';
import { ProjectRisksOpportunities } from '../../shared/models/ProjectData';
import {
  selectNewProjectIsActionNeeded,
  selectNewProjectIsHelpNeeded,
  selectNewProjectOpportunities,
  selectNewProjectRisks,
  setNewProjectIsActionNeededAction,
  setNewProjectIsHelpNeededAction,
  setNewProjectOpportunitiesAction,
  setNewProjectRisksAction,
} from './newProject.redux';

interface Props {
  data?: ProjectRisksOpportunities;
}

const EditableProjectRisksOpportunitiesCard: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const isActionNeeded = useSelector(selectNewProjectIsActionNeeded);
  const isHelpNeeded = useSelector(selectNewProjectIsHelpNeeded);
  const risks = useSelector(selectNewProjectRisks);
  const opportunities = useSelector(selectNewProjectOpportunities);

  useEffect(() => {
    if (data) {
      dispatch(setNewProjectIsActionNeededAction(data.isActionNeeded));
      dispatch(setNewProjectIsHelpNeededAction(data.isHelpNeeded));
      dispatch(setNewProjectOpportunitiesAction(data.projectOpportunities));
      dispatch(setNewProjectRisksAction(data.projectRisks));
    }
  }, [dispatch, data]);

  const handleOnChangeTextField = useCallback(
    (text: string, actionToDispatch: (value: string) => void) => {
      dispatch(actionToDispatch(text));
    },
    [dispatch]
  );

  const handleChangeSwitch = useCallback(
    (isChecked: boolean, actionToDispatch: (isChecked: boolean) => void) => {
      dispatch(actionToDispatch(isChecked));
    },
    [dispatch]
  );

  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>
            {i18n.t('project.risksOpportunities.label')}
          </SectionTitle>
          <TextFieldContainer>
            <FormControlLabel
              control={
                <Switch
                  onChange={e =>
                    handleChangeSwitch(
                      e.target.checked,
                      setNewProjectIsActionNeededAction
                    )
                  }
                  value={isActionNeeded}
                  color="primary"
                  checked={isActionNeeded}
                />
              }
              label={i18n.t('project.risksOpportunities.actionNeeded')}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              fullWidth
              label={i18n.t('project.risksOpportunities.opportunities')}
              onChange={e =>
                handleOnChangeTextField(
                  e.target.value,
                  setNewProjectOpportunitiesAction
                )
              }
              value={opportunities || ''}
              variant="outlined"
              multiline
              rows="4"
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <FormControlLabel
              control={
                <Switch
                  onChange={e =>
                    handleChangeSwitch(
                      e.target.checked,
                      setNewProjectIsHelpNeededAction
                    )
                  }
                  value={isHelpNeeded}
                />
              }
              label={i18n.t('project.risksOpportunities.helpNeeded')}
              checked={isHelpNeeded}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              fullWidth
              label={i18n.t('project.risksOpportunities.risks')}
              onChange={e =>
                handleOnChangeTextField(
                  e.target.value,
                  setNewProjectRisksAction
                )
              }
              value={risks || ''}
              variant="outlined"
              multiline
              rows="4"
            />
          </TextFieldContainer>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default EditableProjectRisksOpportunitiesCard;
