import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import NewProject from './projects/newProject/NewProject';
import NewUpdate from './projects/newUpdate/NewUpdate';
import Dashboard from './projects/projectListView/Dashboard';
import ProjectView from './projects/projectView/ProjectView';
import {
  dashboardPath,
  newProjectPath,
  newProjectUpdatePath,
  projectViewPath,
} from './routing/routes';
import TopBar from './shared/components/TopBar';

const AppRouter: FC = () => {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path={dashboardPath} component={Dashboard} />
        <Route exact path={newProjectPath} component={NewProject} />
        <Route exact path={projectViewPath} component={ProjectView} />
        <Route exact path={newProjectUpdatePath} component={NewUpdate} />
        <Redirect to={dashboardPath} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
