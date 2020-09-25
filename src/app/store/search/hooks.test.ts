import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import mockRequest from '../../services/github-service/__mocks__/search_request.json';
import GithubService, { SearchRequest } from '../../services/github-service';

import * as actions from './actions';
import * as hooks from './hooks';

jest.mock('../../services/github-service', () => jest.fn());
const mockGithubServiceConstructor = GithubService as jest.Mock;

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));
const mockUseDispatch = useDispatch as jest.Mock;
const mockDispatch = jest.fn();
mockUseDispatch.mockImplementation(() => mockDispatch);

jest.mock('./actions', () => ({
  fetchSearch: jest.fn(() => jest.fn(() => jest.fn())),
  clearResults: jest.fn(),
}));
const mockFetchSearchAction = actions.fetchSearch as jest.Mock;
const mockClearResultsAction = actions.clearResults as jest.Mock;

describe('store/search/hooks', () => {
  describe('useFetchSearch', () => {
    const useFetchSearch = () => {
      const rendered = renderHook(() => hooks.useFetchSearch());
      const hook = rendered.result.current;
      return hook;
    };
    beforeEach(jest.clearAllMocks);

    it('should construct a live GithubService', () => {
      expect(mockGithubServiceConstructor).not.toHaveBeenCalled();
      useFetchSearch();
      expect(mockGithubServiceConstructor).toHaveBeenCalled();
    });

    it('should call useDispatch', () => {
      expect(mockUseDispatch).not.toHaveBeenCalled();
      useFetchSearch();
      expect(mockUseDispatch).toHaveBeenCalled();
    });

    it('should return a fetchSearch function', () => {
      const fetchSearch = useFetchSearch();
      expect(typeof fetchSearch).toEqual('function');
    });

    it('should call dispatch when function is called', () => {
      const fetchSearch = useFetchSearch();
      expect(mockDispatch).not.toHaveBeenCalled();
      fetchSearch(mockRequest as SearchRequest);
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call fetchSearch action when function is called', () => {
      const fetchSearch = useFetchSearch();
      expect(mockFetchSearchAction).not.toHaveBeenCalled();
      fetchSearch(mockRequest as SearchRequest);
      expect(mockFetchSearchAction).toHaveBeenCalled();
    });
  });

  describe('useClearResults', () => {
    const useClearResults = () => {
      const rendered = renderHook(() => hooks.useClearResults());
      const hook = rendered.result.current;
      return hook;
    };
    beforeEach(jest.clearAllMocks);

    it('should call useDispatch', () => {
      expect(mockUseDispatch).not.toHaveBeenCalled();
      useClearResults();
      expect(mockUseDispatch).toHaveBeenCalled();
    });

    it('should return a clearResults function', () => {
      const clearResults = useClearResults();
      expect(typeof clearResults).toEqual('function');
    });

    it('should call dispatch when function is called', () => {
      const clearResults = useClearResults();
      expect(mockDispatch).not.toHaveBeenCalled();
      clearResults();
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call clearResults action when function is called', () => {
      const clearResults = useClearResults();
      expect(mockClearResultsAction).not.toHaveBeenCalled();
      clearResults();
      expect(mockClearResultsAction).toHaveBeenCalled();
    });
  });

  describe('useSetQuery', () => {
    const useSetQuery = (request: SearchRequest) => {
      const rendered = renderHook(() => hooks.useSetQuery(request));
      const hook = rendered.result.current;
      return hook;
    };
    beforeEach(jest.clearAllMocks);

    it('should return a setQuery function', () => {
      const setQuery = useSetQuery(mockRequest as SearchRequest);
      expect(typeof setQuery).toEqual('function');
    });

    it('should call fetchSearch action when query is not empty', () => {
      const setQuery = useSetQuery(mockRequest as SearchRequest);
      expect(mockFetchSearchAction).not.toHaveBeenCalled();
      setQuery('foo');
      expect(mockFetchSearchAction).toHaveBeenCalled();
    });

    it('should not call fetchSearch action when query is empty', () => {
      const setQuery = useSetQuery(mockRequest as SearchRequest);
      expect(mockFetchSearchAction).not.toHaveBeenCalled();
      setQuery('');
      expect(mockFetchSearchAction).not.toHaveBeenCalled();
    });

    it('should call clearResults action when query is empty', () => {
      const setQuery = useSetQuery(mockRequest as SearchRequest);
      expect(mockClearResultsAction).not.toHaveBeenCalled();
      setQuery('');
      expect(mockClearResultsAction).toHaveBeenCalled();
    });
  });

  describe('useSetPaging', () => {
    const useSetPaging = (request: SearchRequest) => {
      const rendered = renderHook(() => hooks.useSetPaging(request));
      const hook = rendered.result.current;
      return hook;
    };
    beforeEach(jest.clearAllMocks);

    it('should return a setPaging function', () => {
      const setPaging = useSetPaging(mockRequest as SearchRequest);
      expect(typeof setPaging).toEqual('function');
    });

    it('should always call fetchSearch action when function is called', () => {
      const setPaging = useSetPaging(mockRequest as SearchRequest);
      expect(mockFetchSearchAction).not.toHaveBeenCalled();
      setPaging(1, 10);
      expect(mockFetchSearchAction).toHaveBeenCalled();
    });
  });

  describe('useSetSorting', () => {
    const useSetSorting = (request: SearchRequest) => {
      const rendered = renderHook(() => hooks.useSetSorting(request));
      const hook = rendered.result.current;
      return hook;
    };
    beforeEach(jest.clearAllMocks);

    it('should return a setSorting function', () => {
      const setSorting = useSetSorting(mockRequest as SearchRequest);
      expect(typeof setSorting).toEqual('function');
    });

    it('should always call fetchSearch action when function is called', () => {
      const setSorting = useSetSorting(mockRequest as SearchRequest);
      expect(mockFetchSearchAction).not.toHaveBeenCalled();
      setSorting('forks', 'desc');
      expect(mockFetchSearchAction).toHaveBeenCalled();
    });
  });
});
