import cloneDeep from 'lodash.clonedeep';
import mockRepo from '../../__mocks__/github-repository.json';
import { Repository } from '../../types';
import { ReposActions } from './types';
import initialState from './initialState';
import * as reducers from './reducers';
import searchReducer from './reducer';

const mockActions: ReposActions = {
  FETCH_REPOSITORY: {
    type: 'FETCH_REPOSITORY',
  },
  FETCH_REPOSITORY_SUCCESS: {
    type: 'FETCH_REPOSITORY_SUCCESS',
    payload: {
      repo: mockRepo as Repository,
    },
  },
  FETCH_REPOSITORY_ERROR: {
    type: 'FETCH_REPOSITORY_ERROR',
    payload: {
      error: new Error('uh oh'),
    },
  },
  CLEAR_REPOSITORY_ERROR: {
    type: 'CLEAR_REPOSITORY_ERROR',
  },
};

const reducerSpies = {
  fetchRepository: jest.spyOn(reducers, 'fetchRepository'),
  fetchRepositorySuccess: jest.spyOn(reducers, 'fetchRepositorySuccess'),
  fetchRepositoryError: jest.spyOn(reducers, 'fetchRepositoryError'),
  clearRepositoryError: jest.spyOn(reducers, 'clearRepositoryError'),
};

describe('store/search/reducer', () => {
  describe('FETCH_REPOSITORY', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchRepository reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['FETCH_REPOSITORY'];
      expect(reducerSpies.fetchRepository).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchRepository).toHaveBeenCalled();
    });
  });

  describe('FETCH_REPOSITORY_SUCCESS', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchRepositorySuccess reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['FETCH_REPOSITORY_SUCCESS'];
      expect(reducerSpies.fetchRepositorySuccess).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchRepositorySuccess).toHaveBeenCalled();
    });
  });

  describe('FETCH_REPOSITORY_ERROR', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchRepositoryError reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['FETCH_REPOSITORY_ERROR'];
      expect(reducerSpies.fetchRepositoryError).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchRepositoryError).toHaveBeenCalled();
    });
  });

  describe('CLEAR_REPOSITORY_ERROR', () => {
    beforeEach(jest.clearAllMocks);
    it('should call clearRepositoryError reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions['CLEAR_REPOSITORY_ERROR'];
      expect(reducerSpies.clearRepositoryError).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.clearRepositoryError).toHaveBeenCalled();
    });
  });
});
