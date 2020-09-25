import cloneDeep from 'lodash.clonedeep';
import mockPage from '../../__mocks__/github-search-repositories.json';
import { SearchRequest, Page } from '../../services/github-service/types';
import { Repository } from '../../types';
import { SearchState, SearchActions } from './types';
import initialState from './initialState';
import * as reducers from './reducers';

describe('store/search/reducers', () => {
  describe('fetchSearch', () => {
    const query = 'a test search query';
    const request = cloneDeep({
      ...initialState.request,
      q: query,
    }) as SearchRequest;

    const action: SearchActions['FETCH_SEARCH'] = {
      type: 'FETCH_SEARCH',
      payload: { request },
    };

    let state: SearchState;
    beforeEach(() => {
      state = cloneDeep({
        ...initialState,
        loading: false,
      });
    });
    it('should set loading to true', () => {
      expect(state.loading).toEqual(false);
      const newState = reducers.fetchSearch(state, action);
      expect(newState.loading).toEqual(true);
    });

    it('should set request from payload', () => {
      expect(state.request).toEqual(initialState.request);
      const newState = reducers.fetchSearch(state, action);
      expect(newState.request).toEqual(request);
    });
  });

  describe('fetchSearchSuccess', () => {
    const query = 'react';
    const request = cloneDeep({
      ...initialState.request,
      q: query,
    }) as SearchRequest;

    const page = cloneDeep(mockPage) as Page<Repository>;

    const action: SearchActions['FETCH_SEARCH_SUCCESS'] = {
      type: 'FETCH_SEARCH_SUCCESS',
      payload: { page, request },
    };

    const error = new Error('uh oh');

    let state: SearchState;
    beforeEach(() => {
      state = cloneDeep({
        ...initialState,
        loading: true,
        error,
      });
    });
    it('should set loading to false', () => {
      expect(state.loading).toEqual(true);
      const newState = reducers.fetchSearchSuccess(state, action);
      expect(newState.loading).toEqual(false);
    });

    it('should set request from payload', () => {
      expect(state.request).toEqual(initialState.request);
      const newState = reducers.fetchSearchSuccess(state, action);
      expect(newState.request).toEqual(request);
    });

    it('should set page from payload', () => {
      expect(state.page).toEqual(initialState.page);
      const newState = reducers.fetchSearchSuccess(state, action);
      expect(newState.page).toEqual(page);
    });

    it('should clear any errors', () => {
      expect(state.error).toEqual(error);
      const newState = reducers.fetchSearchSuccess(state, action);
      expect(newState.error).toEqual(undefined);
    });
  });

  describe('fetchSearchError', () => {
    const error = new Error('uh oh');
    const action: SearchActions['FETCH_SEARCH_ERROR'] = {
      type: 'FETCH_SEARCH_ERROR',
      payload: { error },
    };

    let state: SearchState;
    beforeEach(() => {
      state = cloneDeep({
        ...initialState,
        loading: true,
        error: undefined,
      });
    });
    it('should set loading to false', () => {
      expect(state.loading).toEqual(true);
      const newState = reducers.fetchSearchError(state, action);
      expect(newState.loading).toEqual(false);
    });

    it('should set error from payload', () => {
      expect(state.error).toEqual(undefined);
      const newState = reducers.fetchSearchError(state, action);
      expect(newState.error).toEqual(error);
    });
  });

  describe('clearError', () => {
    const action: SearchActions['CLEAR_ERROR'] = {
      type: 'CLEAR_ERROR',
    };
    const error = new Error('uh oh');

    let state: SearchState;
    beforeEach(() => {
      state = cloneDeep({
        ...initialState,
        error,
      });
    });

    it('should clear any errors', () => {
      expect(state.error).toEqual(error);
      const newState = reducers.clearError(state, action);
      expect(newState.error).toEqual(undefined);
    });
  });

  describe('clearResults', () => {
    const action: SearchActions['CLEAR_RESULTS'] = {
      type: 'CLEAR_RESULTS',
    };
    const page = cloneDeep(mockPage) as Page<Repository>;
    const query = 'a test search query';
    const request = cloneDeep({
      ...initialState.request,
      q: query,
    }) as SearchRequest;

    let state: SearchState;
    beforeEach(() => {
      state = cloneDeep({
        ...initialState,
        page,
        request,
      });
    });

    it('should set page results to undefined', () => {
      expect(state.page).toEqual(page);
      const newState = reducers.clearResults(state, action);
      expect(newState.page).toEqual(undefined);
    });

    it('should reset request to default', () => {
      expect(state.request).toEqual(request);
      const newState = reducers.clearResults(state, action);
      expect(newState.request).toEqual(initialState.request);
    });
  });
});
