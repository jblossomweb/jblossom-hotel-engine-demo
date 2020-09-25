import { Reducer } from 'redux';
import setWith from 'lodash.setwith';
import cloneDeep from 'lodash.clonedeep';
import { ReposState, ReposActions } from './types';
import initialState from './initialState';
import paths from './paths';

/*
 * FETCH_REPOSITORY
 */
export const fetchRepository: Reducer<
ReposState,
ReposActions['FETCH_REPOSITORY']
> = (state = initialState) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.loading(), true);
  return newState;
};

/*
 * FETCH_REPOSITORY_SUCCESS
 */
export const fetchRepositorySuccess: Reducer<
ReposState,
ReposActions['FETCH_REPOSITORY_SUCCESS']
> = (state = initialState, { payload: { repo } }) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.repo(repo.full_name), repo);
  setWith(newState, paths.error(), undefined);
  setWith(newState, paths.loading(), false);
  return newState;
};

/*
 * FETCH_REPOSITORY_ERROR
 */
export const fetchRepositoryError: Reducer<
ReposState,
ReposActions['FETCH_REPOSITORY_ERROR']
> = (state = initialState, { payload: { error } }) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.error(), error);
  setWith(newState, paths.loading(), false);
  return newState;
};

/*
 * CLEAR_REPOSITORY_ERROR
 */
export const clearRepositoryError: Reducer<
ReposState,
ReposActions['CLEAR_REPOSITORY_ERROR']
> = (state = initialState) => {
  const newState = cloneDeep(state);
  setWith(newState, paths.error(), undefined);
  return newState;
};
