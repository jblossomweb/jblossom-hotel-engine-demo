import { createSelector } from 'reselect';
import get from 'lodash.get';

import { ApiError } from '../../services/github-service/types';
import { User } from '../../types';
import { AppState } from '../types';
import paths, { rootPath } from './paths';

/*
 * selectMeUser
 */

export const selectMeUser = createSelector(
  [(state: AppState): User | undefined => get(state[rootPath], paths.user())],
  (user) => user || undefined
);

/*
 * selectMeAvatar
 */

export const selectMeAvatar = createSelector(
  [selectMeUser],
  (user) => user?.avatar_url || undefined
);

/*
 * selectMeAvatarLink
 */

export const selectMeAvatarLink = createSelector(
  [selectMeUser],
  (user) => user?.html_url || undefined
);

/*
 * selectLoading
 */

export const selectLoading = createSelector(
  [(state: AppState): boolean => get(state[rootPath], paths.loading())],
  (loading) => loading
);

/*
 * selectLoaded
 */

export const selectLoaded = createSelector(
  [(state: AppState): boolean => get(state[rootPath], paths.loaded())],
  (loaded) => loaded
);

/*
 * selectError
 */

export const selectError = createSelector(
  [(state: AppState): Error | ApiError => get(state[rootPath], paths.error())],
  (error) => error
);
