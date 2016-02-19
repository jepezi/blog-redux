import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Posts from './containers/Posts';
import Post from './containers/Post';

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='posts' component={Posts} />
    <Route path='posts/:id' component={Post} />
  </Route>
);

export default routes;
