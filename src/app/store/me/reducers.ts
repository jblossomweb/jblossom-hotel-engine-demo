import { Reducer } from 'redux';
import setWith from 'lodash.setwith';
import { MeState, MeActions } from './types';
import initialState from './initialState';
import paths from './paths';

/*
 * FETCH_ME_USER
 */
export const fetchMeUser: Reducer<MeState, MeActions['FETCH_ME_USER']> = (
  state = initialState
) => {
  const newState = { ...state };
  setWith(newState, paths.loading(), true);
  return newState;
};

/*
 * FETCH_ME_USER_SUCCESS
 */
export const fetchMeUserSuccess: Reducer<
  MeState,
  MeActions['FETCH_ME_USER_SUCCESS']
> = (state = initialState, { payload: { user } }) => {
  const newState = { ...state };
  setWith(newState, paths.user(), user);
  setWith(newState, paths.loading(), false);
  setWith(newState, paths.loaded(), true);
  return newState;
};

/*
 * FETCH_ME_USER_ERROR
 */
export const fetchMeUserError: Reducer<
  MeState,
  MeActions['FETCH_ME_USER_ERROR']
> = (state = initialState, { payload: { error } }) => {
  const newState = { ...state };
  setWith(newState, paths.error(), error);
  setWith(newState, paths.loading(), false);
  return newState;
};

/*
 * CLEAR_ERROR
 */
export const clearError: Reducer<MeState, MeActions['CLEAR_ERROR']> = (
  state = initialState
) => {
  const newState = { ...state };
  setWith(newState, paths.error(), undefined);
  return newState;
};
