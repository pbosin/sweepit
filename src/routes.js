// Router Dependencies
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import Container / Components for Routing
import ApplicationLayout from './js/components/ApplicationLayout';
import GameContainer from './js/containers/GameContainer';
import NotFound from './js/components/NotFound';

// Routes
export default (
  <Route path="/" component={ApplicationLayout}>
    <IndexRoute component={GameContainer} />
    <Route path="*" component={NotFound} />
  </Route>
);
