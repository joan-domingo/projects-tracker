import CircularProgress from '@material-ui/core/CircularProgress';
import React, { FC } from 'react';
import styled from 'styled-components';

const LoadingPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingPage: FC = () => {
  return (
    <LoadingPageContainer>
      <CircularProgress />
    </LoadingPageContainer>
  );
};

export default LoadingPage;
