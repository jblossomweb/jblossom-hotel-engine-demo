import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import { requestTimeout } from '../../utils';
import {
  GithubServiceInterface,
  ApiError,
  Page,
  SearchRequest,
} from '../../services/github-service/types';

interface FetchSearchParams {
  service: GithubServiceInterface;
  dispatch: Dispatch;
  actions: {
    success: (page: Page<Repository>, request: SearchRequest) => AnyAction;
    error: (error: ApiError | Error) => AnyAction;
  };
}

export const fetchSearch = ({
  service,
  dispatch,
  actions,
}: FetchSearchParams) => (request: SearchRequest) =>
  Promise.race([
    service.searchRepositories(request).then((page) => {
      dispatch(actions.success(page, request) as AnyAction);
    }),
    requestTimeout(5000),
  ]).catch((error: ApiError | Error) => {
    dispatch(actions.error(error) as AnyAction);
  });
