import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { createStore, applyMiddleware, compose } from 'redux';

const reducers = (state = [], action) => {
  if (action.type === 'greeting') {
    return [ ...state, action.name ];
  }

  return state;
}

const store = createStore(reducers);
store.dispatch({ type: 'greeting', name: 'Jip' });
store.dispatch({ type: 'greeting', name: 'Luna' });
console.warn(store.getState());

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('app')
);
