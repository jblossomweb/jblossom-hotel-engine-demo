import { AxiosInstance } from 'axios';
import { Dispatch, AnyAction } from 'redux';
import { Repository } from '../../types';
import {
  GithubService,
  SearchRequest,
  Page,
} from '../../services/github-service';
import mockRequest from '../../services/github-service/__mocks__/search_request.json';
import mockPage from '../../__mocks__/github-search-repositories.json';
import * as actions from './actions';
import * as middleware from './middleware';

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');
const mockDispatch: Dispatch<AnyAction> = (action: AnyAction) => action.type;

const mockBase = 'http://no.where';
const mockToken = 'foobar';
const mockService = new GithubService(mockBase, mockToken, mockAxios);

const spyMiddleware: any = {
  fetchSearch: jest.spyOn(middleware, 'fetchSearch'),
};

describe('store/search/actions', () => {
  describe('fetchSearch', () => {
    const request = mockRequest as SearchRequest;
    const serviced = actions.fetchSearch(mockService);
    const creator = serviced(mockDispatch);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(`should call fetchSearch middleware`, () => {
      expect(spyMiddleware.fetchSearch).not.toHaveBeenCalled();
      creator(request);
      expect(spyMiddleware.fetchSearch).toHaveBeenCalled();
    });

    it(`should inject service into middleware`, () => {
      expect(spyMiddleware.fetchSearch).not.toHaveBeenCalled();
      creator(request);
      expect(spyMiddleware.fetchSearch).toHaveBeenCalledWith(mockService);
    });

    it(`should return FETCH_SEARCH action type`, () => {
      const action = creator(request);
      expect(action.type).toEqual('FETCH_SEARCH');
    });

    it(`should return request in payload`, () => {
      const action = creator(request);
      expect(action.payload).toEqual({ request });
    });
  });

  describe('fetchSearchSuccess', () => {
    const request = mockRequest as SearchRequest;
    const page = mockPage as Page<Repository>;
    const action = actions.fetchSearchSuccess(page, request);

    it(`should return FETCH_SEARCH_SUCCESS action type`, () => {
      expect(action.type).toEqual('FETCH_SEARCH_SUCCESS');
    });

    it(`should return page in payload`, () => {
      expect(action.payload.page).toEqual(page);
    });

    it(`should return request in payload`, () => {
      expect(action.payload.request).toEqual(request);
    });
  });

  describe('fetchSearchError', () => {
    const error = new Error('uh oh');
    const action = actions.fetchSearchError(error);

    it(`should return FETCH_SEARCH_ERROR action type`, () => {
      expect(action.type).toEqual('FETCH_SEARCH_ERROR');
    });

    it(`should return error in payload`, () => {
      expect(action.payload.error).toEqual(error);
    });
  });

  describe('clearError', () => {
    const action = actions.clearError();

    it(`should return CLEAR_ERROR action type`, () => {
      expect(action.type).toEqual('CLEAR_ERROR');
    });
  });

  describe('clearResults', () => {
    const action = actions.clearResults();

    it(`should return CLEAR_RESULTS action type`, () => {
      expect(action.type).toEqual('CLEAR_RESULTS');
    });
  });
});
