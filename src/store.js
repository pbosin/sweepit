// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

// Import Root Reducer
import rootReducer from './js/reducers/index';

// Object for Initial Data
const initialState = {
  game: {
    isLevelSelected: false,
    rowCount: 9,
    colCount: 9,
    mineCount: 10,
    isStarted: false,
    isFinished: false,
    result: '',
    timerId: 0
  },
  field: {
    rows: [],
    clickable: true
  }
};

const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

export default function configureStore() {
  // For Dev Tools
  const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

  // Middleware
  const middleware = [
    thunkMiddleware,
    routerMiddleware(browserHistory),
    asyncDispatchMiddleware
  ];

  // Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      devTools
    )
  );
  console.log(store.getState());

  // Reducer Hot Reloading
  if(module.hot) {
    module.hot.accept('./js/reducers/', () => {
      const nextRootReducer = require('./js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
