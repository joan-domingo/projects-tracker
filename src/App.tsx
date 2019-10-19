import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProjectList from './projectList/ProjectList';
import NewProject from './projects/NewProject';
import { dashboardPath, newProjectPath } from './routing/routes';
import UserBar from './shared/components/UserBar';

const App: FC = () => (
  <>
    <UserBar />
    <BrowserRouter>
      <Switch>
        <Route exact path={dashboardPath()} component={ProjectList} />
        <Route exact path={newProjectPath()} component={NewProject} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
