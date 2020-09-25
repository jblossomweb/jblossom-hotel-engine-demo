/* eslint-disable import/no-cycle */
/*
 * Note: I disabled eslint's circular dependency detection here.
 * Webpack appears to resolve it at build time.
 * In the future, I may consider changing this pattern.
 */
import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import { requestTimeout } from '../../utils';
import {
  GithubServiceInterface,
  ApiError,
} from '../../services/github-service/types';

import * as actions from './actions';

export const fetchRepository = (service: GithubServiceInterface) => (
  dispatch: Dispatch
) => (fullName: string) =>
  Promise.race([
    service.getRepositoryByFullName(fullName).then((repo: Repository) => {
      dispatch(actions.fetchRepositorySuccess(repo) as AnyAction);
    }),
    requestTimeout(5000),
  ]).catch((error: ApiError | Error) => {
    dispatch(actions.fetchRepositoryError(error) as AnyAction);
  });
