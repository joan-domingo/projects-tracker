import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import AppRouter from './AppRouter';
import AuthContainer from './auth/AuthContainer';
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
            <AppRouter />
          </AuthContainer>
        </PageContainer>
      </AppContainer>
    </Provider>
  );
};

export default App;
