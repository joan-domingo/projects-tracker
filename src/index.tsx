import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import AuthContainer from './auth/AuthContainer';
import configureStore from './configureStore';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppContainer from './shared/components/AppContainer';
import PageContainer from './shared/components/PageContainer';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={configureStore()}>
    <AppContainer>
      <PageContainer>
        <AuthContainer>
          <App />
        </AuthContainer>
      </PageContainer>
    </AppContainer>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
