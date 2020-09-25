import cloneDeep from 'lodash.clonedeep';
import mockRequest from '../../services/github-service/__mocks__/search_request.json';
import mockPage from '../../__mocks__/github-search-repositories.json';
import { SearchRequest, Page } from '../../services/github-service/types';
import { Repository } from '../../types';
import { SearchActions } from './types';
import initialState from './initialState';
import * as reducers from './reducers';
import searchReducer from './reducer';

const mockActions: SearchActions = {
  FETCH_SEARCH: {
    type: 'FETCH_SEARCH',
    payload: {
      request: mockRequest as SearchRequest,
    },
  },
  FETCH_SEARCH_SUCCESS: {
    type: 'FETCH_SEARCH_SUCCESS',
    payload: {
      request: mockRequest as SearchRequest,
      page: mockPage as Page<Repository>,
    },
  },
  FETCH_SEARCH_ERROR: {
    type: 'FETCH_SEARCH_ERROR',
    payload: {
      error: new Error('uh oh'),
    },
  },
  CLEAR_ERROR: {
    type: 'CLEAR_ERROR',
  },
  CLEAR_RESULTS: {
    type: 'CLEAR_RESULTS',
  },
};

const reducerSpies = {
  fetchSearch: jest.spyOn(reducers, 'fetchSearch'),
  fetchSearchSuccess: jest.spyOn(reducers, 'fetchSearchSuccess'),
  fetchSearchError: jest.spyOn(reducers, 'fetchSearchError'),
  clearError: jest.spyOn(reducers, 'clearError'),
  clearResults: jest.spyOn(reducers, 'clearResults'),
};

describe('store/search/reducer', () => {
  describe('FETCH_SEARCH', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchSearch reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['FETCH_SEARCH'];
      expect(reducerSpies.fetchSearch).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchSearch).toHaveBeenCalled();
    });
  });

  describe('FETCH_SEARCH_SUCCESS', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchSearchSuccess reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['FETCH_SEARCH_SUCCESS'];
      expect(reducerSpies.fetchSearchSuccess).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchSearchSuccess).toHaveBeenCalled();
    });
  });

  describe('FETCH_SEARCH_ERROR', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchSearchError reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['FETCH_SEARCH_ERROR'];
      expect(reducerSpies.fetchSearchError).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchSearchError).toHaveBeenCalled();
    });
  });

  describe('CLEAR_ERROR', () => {
    beforeEach(jest.clearAllMocks);
    it('should call clearError reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['CLEAR_ERROR'];
      expect(reducerSpies.clearError).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.clearError).toHaveBeenCalled();
    });
  });

  describe('CLEAR_RESULTS', () => {
    beforeEach(jest.clearAllMocks);
    it('should call clearResults reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['CLEAR_RESULTS'];
      expect(reducerSpies.clearResults).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.clearResults).toHaveBeenCalled();
    });
  });
});
