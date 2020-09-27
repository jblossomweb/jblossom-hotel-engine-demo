import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import { requestTimeout } from '../../utils';
import {
  GithubServiceInterface,
  ApiError,
} from '../../services/github-service/types';

interface FetchRepositoryParams {
  service: GithubServiceInterface;
  dispatch: Dispatch;
  actions: {
    success: (repo: Repository) => AnyAction;
    error: (error: ApiError | Error) => AnyAction;
  };
}

export const fetchRepository = ({
  service,
  dispatch,
  actions,
}: FetchRepositoryParams) => (fullName: string) =>
  Promise.race([
    service.getRepositoryByFullName(fullName).then((repo: Repository) => {
      dispatch(actions.success(repo) as AnyAction);
    }),
    requestTimeout(5000),
  ]).catch((error: ApiError | Error) => {
    dispatch(actions.error(error) as AnyAction);
  });
