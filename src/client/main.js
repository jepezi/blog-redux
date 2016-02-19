import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory, match } from 'react-router';
import routes from './routes';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore(window.__JSDATA__);
store.dispatch({ type: 'greeting', payload: {name: 'Jip'} });
store.dispatch({ type: 'greeting', payload: {name: 'Luna'} });

match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
  )
})

// ReactDOM.render(
//   <Provider store={store}>
//     <Router
//       history={browserHistory}
//       routes={routes}
//     />
//   </Provider>,
//   document.getElementById('app')
// );
