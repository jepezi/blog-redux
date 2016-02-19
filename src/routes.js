import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Posts from './containers/Posts';
import Post from './containers/Post';

const PostsRoute = {
  path: 'posts',
  component: Posts
}

const PostRoute = {
  path: 'posts/:id',
  component: Post
}

const NotFoundRoute = {
  path: '*',
  component: () => (<div>Oops! Not Found</div>)
}

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    PostsRoute, PostRoute, NotFoundRoute
  ]
}

export default routes;
