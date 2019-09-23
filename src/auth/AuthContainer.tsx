import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsSignedIn } from './auth.redux';
import LoginPage from './LoginPage';

const AuthContainer: FC = ({ children }) => {
  const isSignedIn = useSelector(selectIsSignedIn);

  if (!isSignedIn) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthContainer;
