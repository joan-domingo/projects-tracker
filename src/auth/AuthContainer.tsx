import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createBrowserHistory } from 'history';
import { dashboard } from '../routing';
import useOnMount from '../shared/hooks/useOnMount';
import { initializeAuthAction, selectIsSignedIn } from './auth.redux';

const history = createBrowserHistory();

const AuthContainer: FC = ({ children }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);

  useOnMount(() => {
    if (!isSignedIn) {
      dispatch(initializeAuthAction());
    }
  });

  useEffect(() => {
    if (isSignedIn) {
      history.replace(dashboard);
    }
  }, [dispatch, isSignedIn]);

  return <>{children}</>;
};

export default AuthContainer;
