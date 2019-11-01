import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
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
  onDataChange: () => void;
}

interface NewProjectMember {
  fullName?: string;
  role?: string;
}

const MultipleTeamMembersInputField: FC = () => {
  const [members, setMembers] = useState<NewProjectMember[]>([]);
  return (
    <MultipleTeamMembersInputFieldContainer>
      <Title>{i18n.t('project.team.members.label')}</Title>
      {members.map((member: NewProjectMember, index) => (
        <TextFieldContainer key={index}>
          <Flex direction="row" alignItems="center">
            <TextField
              style={textFieldStyle}
              label={i18n.t('project.team.members.name')}
              onChange={e =>
                handleDataChange(e.target.value, 'fullName', true, index)
              }
            />
            <TextField
              style={textFieldStyle}
              label={i18n.t('project.team.members.role')}
            />
            <IconButton
              aria-label="remove team member"
              onClick={() => handleRemoveMember(index)}
            >
              <RemoveIcon />
            </IconButton>
          </Flex>
        </TextFieldContainer>
      ))}
      <TextFieldContainer>
        <Flex direction="row" alignItems="center">
          <TextField
            style={textFieldStyle}
            label={i18n.t('project.team.members.name')}
            onChange={e => handleDataChange(e.target.value, 'fullName', true)}
          />
          <TextField
            style={textFieldStyle}
            label={i18n.t('project.team.members.role')}
            onChange={e => handleDataChange(e.target.value, 'role', true)}
          />
          <IconButton aria-label="add team member" onClick={handleAddNewMember}>
            <AddIcon />
          </IconButton>
        </Flex>
      </TextFieldContainer>
    </MultipleTeamMembersInputFieldContainer>
  );

  // TODO does not work yet
  function handleDataChange(
    changedText: string,
    key: keyof NewProjectMember,
    newMember: boolean,
    index: number = members.length
  ) {
    const newObjectMembers: NewProjectMember[] = members;
    if (newMember) {
      if (newObjectMembers[index] === undefined) {
        newObjectMembers.push({ [key]: changedText });
      } else {
        newObjectMembers[index][key] = changedText;
      }
    } else {
      newObjectMembers[index][key] = changedText;
    }
    setMembers(newObjectMembers);
  }

  function handleAddNewMember() {
    const newMember: NewProjectMember = { fullName: '', role: '' };
    setMembers(members.concat(newMember));
  }

  function handleRemoveMember(index: number) {
    const newMembers = members
      .slice(0, index)
      .concat(members.slice(index + 1, members.length));
    setMembers(newMembers);
  }
};

export default MultipleTeamMembersInputField;
