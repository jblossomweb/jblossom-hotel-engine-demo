/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import { GithubService } from '../../services/github-service';
import mockRepo from '../../__mocks__/github-repository.json';
import * as actions from './actions';
import * as middleware from './middleware';

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');
const mockDispatch: Dispatch<AnyAction> = (action: AnyAction) => action.type;

const mockBase = 'http://no.where';
const mockToken = 'foobar';
const mockService = new GithubService(mockBase, mockToken, mockAxios);

const spyMiddleware: any = {
  fetchRepository: jest.spyOn(middleware, 'fetchRepository'),
};

describe('store/search/actions', () => {
  describe('fetchRepository', () => {
    const serviced = actions.fetchRepository(mockService);
    const creator = serviced(mockDispatch);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call fetchRepository middleware', () => {
      expect(spyMiddleware.fetchRepository).not.toHaveBeenCalled();
      creator('foo');
      expect(spyMiddleware.fetchRepository).toHaveBeenCalled();
    });

    it('should inject service into middleware', () => {
      expect(spyMiddleware.fetchRepository).not.toHaveBeenCalled();
      creator('foo');
      expect(spyMiddleware.fetchRepository).toHaveBeenCalledWith(mockService);
    });

    it('should return FETCH_REPOSITORY action type', () => {
      const action = creator('foo');
      expect(action.type).toEqual('FETCH_REPOSITORY');
    });
  });

  describe('fetchRepositorySuccess', () => {
    const repo = mockRepo as Repository;
    const action = actions.fetchRepositorySuccess(mockRepo);

    it('should return FETCH_REPOSITORY_SUCCESS action type', () => {
      expect(action.type).toEqual('FETCH_REPOSITORY_SUCCESS');
    });

    it('should return repo in payload', () => {
      expect(action.payload.repo).toEqual(repo);
    });
  });

  describe('fetchRepositoryError', () => {
    const error = new Error('uh oh');
    const action = actions.fetchRepositoryError(error);

    it('should return FETCH_REPOSITORY_ERROR action type', () => {
      expect(action.type).toEqual('FETCH_REPOSITORY_ERROR');
    });

    it('should return error in payload', () => {
      expect(action.payload.error).toEqual(error);
    });
  });

  describe('clearError', () => {
    const action = actions.clearError();

    it('should return CLEAR_REPOSITORY_ERROR action type', () => {
      expect(action.type).toEqual('CLEAR_REPOSITORY_ERROR');
    });
  });
});
