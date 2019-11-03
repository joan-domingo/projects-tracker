import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-left: 1rem;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;
const RightContainer = styled.div``;

interface Props {
  breadCrumbs?: ReactNode;
  buttons: ReactNode;
}

const NavigationButtonsContainer: FC<Props> = props => {
  return (
    <Container>
      <LeftContainer>{props.breadCrumbs}</LeftContainer>
      <RightContainer>{props.buttons}</RightContainer>
    </Container>
  );
};

export default NavigationButtonsContainer;
