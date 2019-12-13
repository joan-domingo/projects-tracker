import { Card, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n/i18n';
import CardContainer from '../../shared/components/CardContainer';
import LocationCheckboxInput from '../../shared/components/LocationCheckboxInput';
import MultipleTeamMembersInputField from '../../shared/components/MultipleTeamMembersInputField';
import SectionTitle from '../../shared/components/SectionTitle';
import TextFieldContainer from '../../shared/components/TextFieldContainer';
import { NewProjectMember } from '../../shared/models/ProjectData';
import {
  ProjectTeamProps,
  projectTeamPropsValuesAreEqual,
} from '../../shared/utils/ProjectDataUtils';
import {
  selectNewProjectClientLocation,
  selectNewProjectMembers,
  setNewProjectClientLocationAction,
  setNewProjectLocationAction,
  setNewProjectMembersAction,
} from './newProject.redux';

const EditableProjectTeamCard: FC<ProjectTeamProps> = ({ data }) => {
  const dispatch = useDispatch();
  const clientLocation = useSelector(selectNewProjectClientLocation);
  const projectMembers = useSelector(selectNewProjectMembers);

  useEffect(() => {
    if (data) {
      dispatch(setNewProjectClientLocationAction(data.clientLocation));
      dispatch(setNewProjectMembersAction(data.projectMembers));
      dispatch(setNewProjectLocationAction(data.projectLocation));
    }
  }, [dispatch, data]);

  const handleOnMembersDataChange = useCallback(
    (members: NewProjectMember[]) => {
      dispatch(setNewProjectMembersAction(members));
    },
    [dispatch]
  );

  const handleOnChangeTextField = useCallback(
    (text: string, actionToDispatch: (value: string) => void) => {
      dispatch(actionToDispatch(text));
    },
    [dispatch]
  );

  return (
    <CardContainer>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle>{i18n.t('project.team.label')}</SectionTitle>
          <TextFieldContainer>
            <MultipleTeamMembersInputField
              members={projectMembers}
              onDataChange={handleOnMembersDataChange}
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <LocationCheckboxInput />
          </TextFieldContainer>
          <TextFieldContainer>
            <TextField
              fullWidth
              label={i18n.t('project.team.clientLocation')}
              onChange={e =>
                handleOnChangeTextField(
                  e.target.value,
                  setNewProjectClientLocationAction
                )
              }
              value={clientLocation || ''}
            />
          </TextFieldContainer>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

export default React.memo(
  EditableProjectTeamCard,
  projectTeamPropsValuesAreEqual
);
