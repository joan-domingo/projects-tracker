import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './configureStore';
import i18n from './i18n/i18n';
import './i18n/i18n';
import './index.css';
import * as serviceWorker from './serviceWorker';

moment.locale(i18n.language);

const store = configureStore();

const rootElement = document.getElementById('root');
ReactDOM.render(<App store={store} />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
