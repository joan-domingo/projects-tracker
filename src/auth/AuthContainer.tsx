import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../shared/components/LoadingPage';
import {
  selectIsAuthInitialized,
  selectIsLoggingIn,
  selectIsLoggingOut,
  selectIsSignedIn,
} from './auth.redux';
import LoginPage from './LoginPage';

const AuthContainer: FC = ({ children }) => {
  const isAuthInitialized = useSelector(selectIsAuthInitialized);
  const isSignedIn = useSelector(selectIsSignedIn);
  const isLoggingIn = useSelector(selectIsLoggingIn);
  const isLoggingOut = useSelector(selectIsLoggingOut);

  if (!isAuthInitialized || isLoggingIn || isLoggingOut) {
    return <LoadingPage />;
  }

  if (!isSignedIn) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthContainer;
