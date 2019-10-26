import React, { FC } from 'react';
import styled from 'styled-components';
import CardContainer from '../../shared/components/CardContainer';
import EditableProjectOverview from '../newProject/EditableProjectOverview';

const NewUpdateContainer = styled.div``;

const NewUpdate: FC = () => {
  return (
    <NewUpdateContainer>
      <CardContainer>
        <EditableProjectOverview />
      </CardContainer>
    </NewUpdateContainer>
  );
};

export default NewUpdate;
