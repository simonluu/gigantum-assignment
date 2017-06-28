import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';
import Async from '../middlewares/async';

// configures the redux store
const configureStore = () => {
  // creates the store and applys the reducers and middlewares
  const store = createStore(
    reducers,
    applyMiddleware(Async),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;