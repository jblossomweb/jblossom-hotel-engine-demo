import { Dispatch, AnyAction } from 'redux';
import { User } from '../../types';
import { requestTimeout } from '../../utils';
import {
  GithubServiceInterface,
  ApiError,
} from '../../services/github-service/types';

import * as actions from './actions';

export const fetchMeUser = (service: GithubServiceInterface) => (
  dispatch: Dispatch
) =>
  Promise.race([
    service.getCurrentUser().then((user: User) => {
      dispatch(actions.fetchMeUserSuccess(user) as AnyAction);
    }),
    requestTimeout(5000),
  ]).catch((error: ApiError | Error) => {
    dispatch(actions.fetchMeUserError(error) as AnyAction);
  });
