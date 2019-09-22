import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

import { createBrowserHistory } from 'history';
import { selectIsSignedIn } from '../auth/auth.redux';
import { dashboard, login } from './routes';

const history = createBrowserHistory();

const PrivateRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {
  const isSignedIn = useSelector(selectIsSignedIn);
  // tslint:disable-next-line: no-console
  console.log(isSignedIn);
  if (isSignedIn) {
    history.push(dashboard);
  }
  return (
    <Route
      {...rest}
      render={() => {
        // tslint:disable-next-line: no-console
        console.log('hello');
        return isSignedIn ? Component : <Redirect to={login} />;
      }}
    />
  );
};

export default PrivateRoute;
