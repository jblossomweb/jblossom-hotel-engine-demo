import { Repository } from '../../types';
import {
  ApiError,
  Page,
  SearchRequest,
} from '../../services/github-service/types';

export interface SearchState {
  request: SearchRequest;
  page?: Page<Repository>;
  loading?: boolean;
  error?: Error | ApiError;
}

export interface SearchActions {
  FETCH_SEARCH: {
    type: 'FETCH_SEARCH';
    payload: {
      request: SearchRequest;
    };
  };

  FETCH_SEARCH_SUCCESS: {
    type: 'FETCH_SEARCH_SUCCESS';
    payload: {
      page: Page<Repository>;
      request: SearchRequest;
    };
  };

  FETCH_SEARCH_ERROR: {
    type: 'FETCH_SEARCH_ERROR';
    payload: {
      error: Error | ApiError;
    };
  };

  CLEAR_ERROR: {
    type: 'CLEAR_ERROR';
  };

  CLEAR_RESULTS: {
    type: 'CLEAR_RESULTS';
  };
}
