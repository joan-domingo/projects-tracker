import React, { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from './auth/LandingPage';
import Dashboard from './dashboard/Dashboard';
import { dashboard, landing } from './routing';

const App: FC = () => (
  <Router>
    <Route exact path={landing} component={LandingPage} />
    <Route path={dashboard} component={Dashboard} />
  </Router>
);

export default App;
