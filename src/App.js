// Import Project Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS/SCSS
import './css/application.scss';
import './css/game_status.scss';
import './css/cell.scss';
import './css/level_selector.scss';
import './css/header.scss';

// Router Dependencies
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

// Store Dependencies
import configureStore from './store';
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Router
const router = (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

// Render to index.html HTML element
ReactDOM.render(
  router, document.getElementById('app')
);
