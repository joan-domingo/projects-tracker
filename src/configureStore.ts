import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { AuthDependencies } from './auth/auth.redux';
import rootReducer, { rootEpic } from './root.redux';
import { authService } from './services';

type Dependencies = AuthDependencies;

const dependencies: Dependencies = {
  authService,
};

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware({ dependencies });
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
}
