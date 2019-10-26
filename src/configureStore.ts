import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { AuthDependencies } from './auth/auth.redux';
import { ProjectDataDependencies } from './projects/projectData.redux';
import rootReducer, { rootEpic } from './root.redux';
import { authService, projectDataService } from './services';

type Dependencies = AuthDependencies & ProjectDataDependencies;

const dependencies: Dependencies = {
  authService,
  projectDataService,
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
