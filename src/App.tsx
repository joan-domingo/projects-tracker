import React, { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import { dashboard, landing } from './routing';
import SignInPage from './SignIn/SignInPage';

const App: FC = () => (
  <Router>
    <Route exact path={landing} component={SignInPage} />
    <Route path={dashboard} component={Dashboard} />
  </Router>
);

export default App;
