import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import filtersReducer from '../reducers/filters';
import tripsReducer from '../reducers/trips';
import eventsReducer from '../reducers/events';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      filters: filtersReducer,
      trips: tripsReducer,
      events: eventsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};