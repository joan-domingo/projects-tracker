import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { NewProjectMember } from '../models/ProjectData';
import { darkGray } from '../styles/colors';
import { normal } from '../styles/dimensions';
import Flex from './Flex';
import TextFieldContainer from './TextFieldContainer';

const MultipleTeamMembersInputFieldContainer = styled.div`
  outline-width: 0.5px;
  outline-style: solid;
  outline-color: ${darkGray};
  padding: ${normal};
`;

const Title = styled.div`
  font-size: 1rem;
`;

const textFieldStyle = {
  width: '33%',
  marginRight: '2rem',
};

interface Props {
  members: NewProjectMember[];
  onDataChange: (members: NewProjectMember[]) => void;
}

const MultipleTeamMembersInputField: FC<Props> = ({
  members = [],
  onDataChange,
}) => {
  const handleDataChange = useCallback(
    (text: string, key: keyof NewProjectMember, index: number) => {
      const newMembers = members.slice();
      if (newMembers[index] === undefined) {
        newMembers.push({ [key]: text });
      } else {
        newMembers[index][key] = text;
      }
      onDataChange(newMembers);
    },
    [members, onDataChange]
  );

  const handleAddNewMember = useCallback(() => {
    const newMembers = members.slice();
    if (newMembers.length === 0) {
      newMembers.push({ fullName: '', role: '' });
    }
    newMembers.push({ fullName: '', role: '' });
    onDataChange(newMembers);
  }, [members, onDataChange]);

  const handleRemoveNewMember = useCallback(
    (index: number) => {
      const newMembers = members
        .slice(0, index)
        .concat(members.slice(index + 1, members.length));
      onDataChange(newMembers);
    },
    [members, onDataChange]
  );

  const AddTeamMemberButton = (
    <IconButton aria-label="add team member" onClick={handleAddNewMember}>
      <AddIcon />
    </IconButton>
  );

  const removeTeamMemberButton = (index: number) => (
    <IconButton
      aria-label="remove team member"
      onClick={() => handleRemoveNewMember(index)}
    >
      <RemoveIcon />
    </IconButton>
  );

  return (
    <MultipleTeamMembersInputFieldContainer>
      <Title>{i18n.t('project.team.members.label')}</Title>
      {members.length < 2 ? (
        <TextFieldContainer>
          <Flex direction="row" alignItems="center">
            <TextField
              style={textFieldStyle}
              label={i18n.t('project.team.members.name')}
              value={members[0] ? members[0].fullName : ''}
              onChange={e => handleDataChange(e.target.value, 'fullName', 0)}
            />
            <TextField
              style={textFieldStyle}
              label={i18n.t('project.team.members.role')}
              value={members[0] ? members[0].role : ''}
              onChange={e => handleDataChange(e.target.value, 'role', 0)}
            />
            {AddTeamMemberButton}
          </Flex>
        </TextFieldContainer>
      ) : (
        <>
          {members.map((member: NewProjectMember, index) => (
            <TextFieldContainer key={index}>
              <Flex direction="row" alignItems="center">
                <TextField
                  style={textFieldStyle}
                  label={i18n.t('project.team.members.name')}
                  value={members[index].fullName}
                  onChange={e =>
                    handleDataChange(e.target.value, 'fullName', index)
                  }
                />
                <TextField
                  style={textFieldStyle}
                  label={i18n.t('project.team.members.role')}
                  value={members[index].role}
                  onChange={e =>
                    handleDataChange(e.target.value, 'role', index)
                  }
                />
                {members.length === index + 1
                  ? AddTeamMemberButton
                  : removeTeamMemberButton(index)}
              </Flex>
            </TextFieldContainer>
          ))}
        </>
      )}
    </MultipleTeamMembersInputFieldContainer>
  );
};

export default MultipleTeamMembersInputField;
