import React, { FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './auth/LoginPage';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';
import { dashboard, login } from './routing/routes';

const App: FC = () => (
  <BrowserRouter>
    <Route path={login} component={LoginPage} />
    <PrivateRoute exact path={dashboard} component={Dashboard} />
  </BrowserRouter>
);

export default App;
