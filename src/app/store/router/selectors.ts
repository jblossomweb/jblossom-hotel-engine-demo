import { createSelector } from 'reselect';
import get from 'lodash.get';

import { AppState } from '../types';
import paths, { rootPath } from './paths';

/*
 * getPathName
 */

const getPathNameSelector = (state: AppState): string =>
  get(state[rootPath], paths.pathName());

export const getPathName = createSelector(
  [getPathNameSelector],
  (pathName: string | undefined) => pathName
);

/*
 * getQueryParams
 */

const getQueryParamsSelector = (state: AppState): { [key: string]: string } =>
  get(state[rootPath], paths.queryParams());

export const getQueryParams = createSelector(
  [getQueryParamsSelector],
  (queryParams: { [key: string]: string } | undefined) => queryParams
);
