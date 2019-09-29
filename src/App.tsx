import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProjectList from './projectList/ProjectList';
import { dashboard } from './routing/routes';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={dashboard} component={ProjectList} />
    </Switch>
  </BrowserRouter>
);

export default App;
