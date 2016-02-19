import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';

const NotFoundRoute = {
  path: '*',
  component: () => <div>Oops! Not Found</div>
}

const PostsRoute = {
  path: 'posts',
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./containers/Posts'))
    });
  }
}

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    PostsRoute, NotFoundRoute
  ]
}

export default routes;
