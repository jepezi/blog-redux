import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';

const NotFoundRoute = {
  path: '*',
  component: () => <div>Oops! Not Found</div>
}

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    NotFoundRoute
  ]
}

export default routes;
