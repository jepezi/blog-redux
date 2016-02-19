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

const PostRoute = {
  path: 'posts/:id',
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./containers/Post'))
    });
  }
}

const PostNewRoute = {
  path: 'posts/new',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/PostForm'));
    });
  }
}

const CommentsRoute = {
  path: 'comments',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Comments'));
    });
  }
}

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    PostsRoute, PostNewRoute, PostRoute, CommentsRoute, NotFoundRoute
  ]
}

export default routes;
