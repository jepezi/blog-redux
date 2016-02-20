import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();
store.dispatch({ type: 'greeting', payload: {name: 'Jip'} });
store.dispatch({ type: 'greeting', payload: {name: 'Luna'} });
console.warn(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
    />
  </Provider>,
  document.getElementById('app')
);
