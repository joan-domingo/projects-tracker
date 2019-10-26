import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import NewProject from './projects/newProject/NewProject';
import NewUpdate from './projects/newUpdate/NewUpdate';
import ProjectList from './projects/projectListView/ProjectList';
import ProjectView from './projects/projectView/ProjectView';
import {
  dashboardPath,
  newProjectPath,
  newProjectUpdatePath,
  projectViewPath,
} from './routing/routes';

const AppRouter: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={dashboardPath} component={ProjectList} />
        <Route path={newProjectPath} component={NewProject} />
        <Route path={projectViewPath} component={ProjectView} />
        <Route path={newProjectUpdatePath} component={NewUpdate} />
        <Redirect to={dashboardPath} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
