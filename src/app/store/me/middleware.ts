import { Dispatch, AnyAction } from 'redux';
import { User } from '../../types';
import { requestTimeout } from '../../utils';
import {
  GithubServiceInterface,
  ApiError,
} from '../../services/github-service/types';

interface FetchMeUserParams {
  service: GithubServiceInterface;
  dispatch: Dispatch;
  actions: {
    success: (user: User) => AnyAction;
    error: (error: ApiError | Error) => AnyAction;
  };
}

export const fetchMeUser = ({
  service,
  dispatch,
  actions,
}: FetchMeUserParams) =>
  Promise.race([
    service.getCurrentUser().then((user: User) => {
      dispatch(actions.success(user) as AnyAction);
    }),
    requestTimeout(5000),
  ]).catch((error: ApiError | Error) => {
    dispatch(actions.error(error) as AnyAction);
  });
