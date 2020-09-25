import { Reducer } from 'redux';
import setWith from 'lodash.setwith';
import cloneDeep from 'lodash.clonedeep';
import { SearchState, SearchActions } from './types';
import initialState from './initialState';
import paths from './paths';

/*
 * FETCH_SEARCH
 */
export const fetchSearch: Reducer<
SearchState,
SearchActions['FETCH_SEARCH']
> = (state = initialState, { payload: { request } }) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.loading(), true);
  setWith(newState, paths.request(), request);
  return newState;
};

/*
 * FETCH_SEARCH_SUCCESS
 */
export const fetchSearchSuccess: Reducer<
SearchState,
SearchActions['FETCH_SEARCH_SUCCESS']
> = (state = initialState, { payload: { page, request } }) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.loading(), false);
  setWith(newState, paths.request(), request);
  setWith(newState, paths.page(), page);
  setWith(newState, paths.error(), undefined);

  return newState;
};

/*
 * FETCH_SEARCH_ERROR
 */
export const fetchSearchError: Reducer<
SearchState,
SearchActions['FETCH_SEARCH_ERROR']
> = (state = initialState, { payload: { error } }) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.error(), error);
  setWith(newState, paths.loading(), false);
  return newState;
};

/*
 * CLEAR_ERROR
 */
export const clearError: Reducer<SearchState, SearchActions['CLEAR_ERROR']> = (
  state = initialState
) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.error(), undefined);
  return newState;
};

/*
 * CLEAR_RESULTS
 */
export const clearResults: Reducer<
SearchState,
SearchActions['CLEAR_RESULTS']
> = (state = initialState) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.page(), undefined);
  setWith(newState, paths.request(), initialState.request);
  return newState;
};
