import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProjectList from './projectList/ProjectList';
import { dashboard } from './routing/routes';
import UserBar from './shared/components/UserBar';

const App: FC = () => (
  <>
    <UserBar />
    <BrowserRouter>
      <Switch>
        <Route exact path={dashboard} component={ProjectList} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
