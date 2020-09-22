import { Dispatch, AnyAction } from 'redux';
import { User } from '../../types';
import {
  GithubServiceInterface,
  ApiError,
} from '../../services/github-service';

import { MeActions } from './types';
import * as middleware from './middleware';

/*
 * FETCH_ME_USER
 */
export const fetchMeUser: (
  service: GithubServiceInterface
) => (dispatch: Dispatch<AnyAction>) => MeActions['FETCH_ME_USER'] = (
  service
) => (dispatch) => {
  middleware.fetchMeUser(service)(dispatch);
  return {
    type: 'FETCH_ME_USER',
  };
};

/*
 * FETCH_ME_USER_SUCCESS
 */
export const fetchMeUserSuccess: (
  user: User
) => MeActions['FETCH_ME_USER_SUCCESS'] = (user) => ({
  type: 'FETCH_ME_USER_SUCCESS',
  payload: {
    user,
  },
});

/*
 * FETCH_ME_USER_ERROR
 */
export const fetchMeUserError: (
  error: Error | ApiError
) => MeActions['FETCH_ME_USER_ERROR'] = (error) => ({
  type: 'FETCH_ME_USER_ERROR',
  payload: {
    error,
  },
});

/*
 * CLEAR_ERROR
 */
export const clearError: () => MeActions['CLEAR_ERROR'] = () => ({
  type: 'CLEAR_ERROR',
});
