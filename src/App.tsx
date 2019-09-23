import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import { dashboard } from './routing/routes';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={dashboard} component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
