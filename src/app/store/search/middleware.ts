import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import { requestTimeout } from '../../utils';
import {
  GithubServiceInterface,
  ApiError,
  Page,
  SearchRequest,
} from '../../services/github-service/types';

import * as actions from './actions';

export const fetchSearch = (service: GithubServiceInterface) => (
  dispatch: Dispatch
) => (request: SearchRequest) =>
  Promise.race([
    service.searchRepositories(request).then((page: Page<Repository>) => {
      dispatch(actions.fetchSearchSuccess(page, request) as AnyAction);
    }),
    requestTimeout(5000),
  ]).catch((error: ApiError | Error) => {
    dispatch(actions.fetchSearchError(error) as AnyAction);
  });
