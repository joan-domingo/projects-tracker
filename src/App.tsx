import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import AppRouter from './AppRouter';
import AppContainer from './shared/components/AppContainer';
import PageContainer from './shared/components/PageContainer';

interface Props {
  store: Store;
}

const App: FC<Props> = ({ store }) => {
  return (
    <Provider store={store}>
      <AppContainer>
        <PageContainer>
          <AppRouter />
        </PageContainer>
      </AppContainer>
    </Provider>
  );
};

export default App;
