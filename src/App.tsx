import React, { FC } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Store } from 'redux';
import AuthContainer from './auth/AuthContainer';
import ProjectList from './projectList/ProjectList';
import NewProject from './projects/NewProject';
import ProjectView from './projects/ProjectView';
import {
  dashboardPath,
  newProjectPath,
  projectViewPath,
} from './routing/routes';
import AppContainer from './shared/components/AppContainer';
import NavigationBar from './shared/components/NavigationBar';
import PageContainer from './shared/components/PageContainer';

interface Props {
  store: Store;
}

const App: FC<Props> = ({ store }) => {
  return (
    <Provider store={store}>
      <AppContainer>
        <PageContainer>
          <AuthContainer>
            <NavigationBar />
            <Router>
              <Switch>
                <Route path={dashboardPath} component={ProjectList} />
                <Route path={newProjectPath} component={NewProject} />
                <Route path={projectViewPath} component={ProjectView} />
                <Redirect to={dashboardPath} />
              </Switch>
            </Router>
          </AuthContainer>
        </PageContainer>
      </AppContainer>
    </Provider>
  );
};

export default App;
