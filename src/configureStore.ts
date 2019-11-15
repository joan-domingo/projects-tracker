import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { ProjectDataDependencies } from './projects/projectData.redux';
import rootReducer, { rootEpic } from './root.redux';
import { projectDataService } from './services';

type Dependencies = ProjectDataDependencies;

const dependencies: Dependencies = {
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
