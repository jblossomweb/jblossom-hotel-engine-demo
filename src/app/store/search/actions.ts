/* eslint-disable import/no-cycle */
/*
 * Note: I disabled eslint's circular dependency detection here.
 * Webpack appears to resolve it at build time.
 * In the future, I may consider changing this pattern.
 */
import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import {
  GithubServiceInterface,
  ApiError,
  Page,
  SearchRequest,
} from '../../services/github-service';

import { SearchActions } from './types';
import * as middleware from './middleware';

/*
 * FETCH_SEARCH
 */
export const fetchSearch: (
  service: GithubServiceInterface
) => (
  dispatch: Dispatch<AnyAction>
) => (request: SearchRequest) => SearchActions['FETCH_SEARCH'] = (service) => (
  dispatch
) => (request) => {
  middleware.fetchSearch(service)(dispatch)(request);
  return {
    type: 'FETCH_SEARCH',
    payload: {
      request,
    },
  };
};

/*
 * FETCH_SEARCH_SUCCESS
 */
export const fetchSearchSuccess: (
  page: Page<Repository>,
  request: SearchRequest
) => SearchActions['FETCH_SEARCH_SUCCESS'] = (page, request) => ({
  type: 'FETCH_SEARCH_SUCCESS',
  payload: {
    page,
    request,
  },
});

/*
 * FETCH_SEARCH_ERROR
 */
export const fetchSearchError: (
  error: Error | ApiError
) => SearchActions['FETCH_SEARCH_ERROR'] = (error) => ({
  type: 'FETCH_SEARCH_ERROR',
  payload: {
    error,
  },
});

/*
 * CLEAR_ERROR
 */
export const clearError: () => SearchActions['CLEAR_ERROR'] = () => ({
  type: 'CLEAR_ERROR',
});

/*
 * CLEAR_RESULTS
 */
export const clearResults: () => SearchActions['CLEAR_RESULTS'] = () => ({
  type: 'CLEAR_RESULTS',
});
