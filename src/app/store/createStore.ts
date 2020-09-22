import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import throttle from 'lodash.throttle';

import { history } from '../../core/history';
import { AppState } from './types';
import { loadState, saveState } from './localStorage';

import createRootReducer from './rootReducer';

const middlewares = [routerMiddleware(history)];

export default (state: AppState = loadState()) => {
  const store = createStore(
    createRootReducer(history),
    state,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  return store;
};
