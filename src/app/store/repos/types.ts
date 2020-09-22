import { Repository } from '../../types';
import { ApiError } from '../../services/github-service/types';

export interface ReposState {
  repos: {
    [full_name: string]: Repository;
  };
  loading?: boolean;
  error?: Error | ApiError;
}

export interface ReposActions {
  FETCH_REPOSITORY: {
    type: 'FETCH_REPOSITORY';
  };

  FETCH_REPOSITORY_SUCCESS: {
    type: 'FETCH_REPOSITORY_SUCCESS';
    payload: {
      repo: Repository;
    };
  };

  FETCH_REPOSITORY_ERROR: {
    type: 'FETCH_REPOSITORY_ERROR';
    payload: {
      error: Error | ApiError;
    };
  };

  CLEAR_REPOSITORY_ERROR: {
    type: 'CLEAR_REPOSITORY_ERROR';
  };
}
