import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useOnMount from '../shared/hooks/useOnMount';
import { initializeAuthAction, selectIsSignedIn } from './auth.redux';

const AuthContainer: FC = ({ children }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);

  useOnMount(() => {
    if (!isSignedIn) {
      dispatch(initializeAuthAction());
    }
  });

  return <>{children}</>;
};

export default AuthContainer;
