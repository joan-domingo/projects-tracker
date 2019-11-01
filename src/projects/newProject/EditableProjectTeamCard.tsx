import { Card, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import MultipleTeamMembersInputField from '../../shared/components/MultipleTeamMembersInputField';
import SectionTitle from '../../shared/components/SectionTitle';
import TextFieldContainer from '../../shared/components/TextFieldContainer';
import { ProjectTeam } from '../../shared/models/ProjectData';
import {
  selectNewProjectClientLocation,
  setNewProjectClientLocationAction,
} from './newProject.redux';

interface Props {
  team?: ProjectTeam;
}

const EditableProjectTeamCard: FC<Props> = ({ team }) => {
  const dispatch = useDispatch();
  const clientLocation = useSelector(selectNewProjectClientLocation);

  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.team.label')}</SectionTitle>
          <TextFieldContainer>
            <TextField
              required
              fullWidth
              label={i18n.t('project.team.clientLocation')}
              onChange={e =>
                handleOnChangeTextField(e, setNewProjectClientLocationAction)
              }
              value={defineTextFieldValue(
                clientLocation,
                team && team.clientLocation
              )}
              onBlur={() =>
                handleOnBlurTextField(
                  clientLocation,
                  team && team.clientLocation,
                  setNewProjectClientLocationAction
                )
              }
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <MultipleTeamMembersInputField />
          </TextFieldContainer>
        </CardContent>
      </Card>
    </CardContainer>
  );

  function handleOnChangeTextField(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    actionToDispatch: (value: string) => void
  ) {
    dispatch(actionToDispatch(e.target.value));
  }

  function handleOnBlurTextField(
    enteredValue: string | undefined,
    defaultValue: string | undefined,
    actionToDispatch: (value: string) => void
  ) {
    return !enteredValue && team && dispatch(actionToDispatch(defaultValue!));
  }

  function defineTextFieldValue(
    enteredValue: string | undefined,
    defaultValue: string | undefined
  ): string {
    if (enteredValue || enteredValue === '') {
      return enteredValue;
    }
    return defaultValue || '';
  }
};

export default EditableProjectTeamCard;
