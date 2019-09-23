import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthInitialized, selectIsSignedIn } from './auth.redux';
import LoadingPage from './LoadingPage';
import LoginPage from './LoginPage';

const AuthContainer: FC = ({ children }) => {
  const isAuthInitialized = useSelector(selectIsAuthInitialized);
  const isSignedIn = useSelector(selectIsSignedIn);

  if (!isAuthInitialized) {
    return <LoadingPage />;
  }

  if (!isSignedIn) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthContainer;
