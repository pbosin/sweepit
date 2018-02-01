import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { game } from './game';
import { field } from './field';

// combine reducers
const rootReducer = combineReducers({game, field, routing: routerReducer });

export default rootReducer;
