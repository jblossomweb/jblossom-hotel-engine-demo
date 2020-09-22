import { combineReducers, Reducer, CombinedState } from 'redux';
import { connectRouter } from 'connected-react-router';
import { AppState } from './types';

// import reducers
import meReducer from './me/reducer';
import searchReducer from './search/reducer';
import reposReducer from './repos/reducer';

type RootReducer = Reducer<CombinedState<AppState>> | any;
type CreateRootReducer = (history: any) => RootReducer;

const createRootReducer: CreateRootReducer = (history) =>
  combineReducers({
    // register reducers
    me: meReducer,
    search: searchReducer,
    repos: reposReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
