import { createSelector } from 'reselect';
import get from 'lodash.get';

import {
  ApiError,
  Page,
  SearchRequest,
} from '../../services/github-service/types';
import { Repository } from '../../types';
import { AppState } from '../types';
import paths, { rootPath } from './paths';
import initialState from './initialState';

/*
 * selectPage
 */

export const selectPage = createSelector(
  [
    (state: AppState): Page<Repository> | undefined =>
      get(state[rootPath], paths.page()),
  ],
  (page) => page
);

/*
 * selectPageItems
 */

export const selectPageItems = createSelector(
  [selectPage],
  (page) => page?.items
);

/*
 * selectNumTotalItems
 */

export const selectNumTotalItems = createSelector(
  [selectPage],
  (page) => page?.total_count || 0
);

/*
 * selectRequest
 */

export const selectRequest = createSelector(
  [(state: AppState): SearchRequest => get(state[rootPath], paths.request())],
  (request) => request || initialState.request
);

/*
 * selectPageNum
 */

export const selectPageNum = createSelector(
  [selectRequest],
  (request) => request?.page
);

/*
 * selectPageSize
 */

export const selectPageSize = createSelector(
  [selectRequest],
  (request) => request?.per_page
);

/*
 * selectNumTotalPages
 */

export const selectNumTotalPages = createSelector(
  [selectNumTotalItems, selectPageSize],
  (totalItems, pageSize) => Math.ceil(totalItems / pageSize)
);

/*
 * selectSort
 */

export const selectSort = createSelector(
  [selectRequest],
  (request) => request?.sort
);

/*
 * selectOrder
 */

export const selectOrder = createSelector(
  [selectRequest],
  (request) => request?.order
);

/*
 * selectFilters
 */

export const selectFilters = createSelector([selectRequest], ({ q }) =>
  q.split(' ').filter((word) => word.includes(':'))
);

/*
 * selectFilteredLanguages
 */

export const selectFilteredLanguages = createSelector(
  [selectFilters],
  (filters) =>
    filters
      .filter((filter) => filter.includes('language:'))
      .map((filter) => filter.replace('language:', ''))
);

/*
 * selectLoading
 */

export const selectLoading = createSelector(
  [(state: AppState): boolean => get(state[rootPath], paths.loading())],
  (loading) => loading
);

/*
 * selectError
 */

export const selectError = createSelector(
  [(state: AppState): Error | ApiError => get(state[rootPath], paths.error())],
  (error) => error
);
