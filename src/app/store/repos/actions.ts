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
} from '../../services/github-service';

import { ReposActions } from './types';
import * as middleware from './middleware';

/*
 * FETCH_REPOSITORY
 */
export const fetchRepository: (
  service: GithubServiceInterface
) => (
  dispatch: Dispatch<AnyAction>
) => (fullName: string) => ReposActions['FETCH_REPOSITORY'] = (service) => (
  dispatch
) => (fullName) => {
  middleware.fetchRepository(service)(dispatch)(fullName);
  return {
    type: 'FETCH_REPOSITORY',
  };
};

/*
 * FETCH_REPOSITORY_SUCCESS
 */
export const fetchRepositorySuccess: (
  repo: Repository
) => ReposActions['FETCH_REPOSITORY_SUCCESS'] = (repo) => ({
  type: 'FETCH_REPOSITORY_SUCCESS',
  payload: {
    repo,
  },
});

/*
 * FETCH_REPOSITORY_ERROR
 */
export const fetchRepositoryError: (
  error: Error | ApiError
) => ReposActions['FETCH_REPOSITORY_ERROR'] = (error) => ({
  type: 'FETCH_REPOSITORY_ERROR',
  payload: {
    error,
  },
});

/*
 * CLEAR_REPOSITORY_ERROR
 */
export const clearError: () => ReposActions['CLEAR_REPOSITORY_ERROR'] = () => ({
  type: 'CLEAR_REPOSITORY_ERROR',
});
