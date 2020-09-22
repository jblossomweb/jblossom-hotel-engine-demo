import { Reducer } from 'redux';
import { AppAction } from '../types';
import { MeState, MeActions } from './types';
import initalState from './initialState';
import * as reducers from './reducers';

const meReducer: Reducer<MeState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'FETCH_ME_USER':
      return reducers.fetchMeUser(state, action as MeActions['FETCH_ME_USER']);

    case 'FETCH_ME_USER_SUCCESS':
      return reducers.fetchMeUserSuccess(
        state,
        action as MeActions['FETCH_ME_USER_SUCCESS']
      );

    case 'FETCH_ME_USER_ERROR':
      return reducers.fetchMeUserError(
        state,
        action as MeActions['FETCH_ME_USER_ERROR']
      );

    case 'CLEAR_ERROR':
      return reducers.clearError(state, action as MeActions['CLEAR_ERROR']);
  }
  return state || initalState;
};

export default meReducer;
