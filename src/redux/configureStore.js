import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './modules/reducers';
import { thunk, promise } from '../lib/middlewares';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk, promise, createLogger()),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('./modules/reducers', () =>
      store.replaceReducer(require('./modules/reducers'))
    );
  }

  return store;
}
