import { Reducer } from 'redux';
import { AppAction } from '../types';
import { SearchState, SearchActions } from './types';
import initalState from './initialState';
import * as reducers from './reducers';

const searchReducer: Reducer<SearchState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH':
      return reducers.fetchSearch(
        state,
        action as SearchActions['FETCH_SEARCH']
      );

    case 'FETCH_SEARCH_SUCCESS':
      return reducers.fetchSearchSuccess(
        state,
        action as SearchActions['FETCH_SEARCH_SUCCESS']
      );

    case 'FETCH_SEARCH_ERROR':
      return reducers.fetchSearchError(
        state,
        action as SearchActions['FETCH_SEARCH_ERROR']
      );

    case 'CLEAR_ERROR':
      return reducers.clearError(state, action as SearchActions['CLEAR_ERROR']);

    case 'CLEAR_RESULTS':
      return reducers.clearResults(
        state,
        action as SearchActions['CLEAR_RESULTS']
      );
  }
  return state || initalState;
};

export default searchReducer;
