import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './modules/reducers';

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('./modules/reducers', () =>
      store.replaceReducer(require('./modules/reducers'))
    );
  }

  return store;
}
