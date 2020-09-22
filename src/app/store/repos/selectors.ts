import { createSelector } from 'reselect';
import get from 'lodash.get';

import { ApiError } from '../../services/github-service/types';
import { Repository } from '../../types';
import { AppState } from '../types';
import paths, { rootPath } from './paths';

/*
 * selectRepos
 */

export const selectRepos = createSelector(
  [
    (state: AppState): { [fullName: string]: Repository } =>
      get(state[rootPath], paths.repos()),
  ],
  (repos) => repos || {}
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
