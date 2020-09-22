import { User } from '../../types';
import { ApiError } from '../../services/github-service/types';

export interface MeState {
  user?: User;
  loading?: boolean;
  loaded?: boolean;
  error?: ApiError;
}

export interface MeActions {
  FETCH_ME_USER: {
    type: 'FETCH_ME_USER';
  };

  FETCH_ME_USER_SUCCESS: {
    type: 'FETCH_ME_USER_SUCCESS';
    payload: {
      user: User;
    };
  };

  FETCH_ME_USER_ERROR: {
    type: 'FETCH_ME_USER_ERROR';
    payload: {
      error: Error | ApiError;
    };
  };

  CLEAR_ERROR: {
    type: 'CLEAR_ERROR';
  };
}
