import { Reducer } from 'redux';
import { AppAction } from '../types';
import { ReposState, ReposActions } from './types';
import initalState from './initialState';
import * as reducers from './reducers';

const searchReducer: Reducer<ReposState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'FETCH_REPOSITORY':
      return reducers.fetchRepository(
        state,
        action as ReposActions['FETCH_REPOSITORY']
      );

    case 'FETCH_REPOSITORY_SUCCESS':
      return reducers.fetchRepositorySuccess(
        state,
        action as ReposActions['FETCH_REPOSITORY_SUCCESS']
      );

    case 'FETCH_REPOSITORY_ERROR':
      return reducers.fetchRepositoryError(
        state,
        action as ReposActions['FETCH_REPOSITORY_ERROR']
      );

    case 'CLEAR_REPOSITORY_ERROR':
      return reducers.clearRepositoryError(
        state,
        action as ReposActions['CLEAR_REPOSITORY_ERROR']
      );
  }
  return state || initalState;
};

export default searchReducer;
