/* eslint-disable @typescript-eslint/naming-convention */
import { useDispatch } from 'react-redux';

import GithubService, { SearchRequest } from '../../services/github-service';
import * as searchActions from './actions';
import * as utils from '../../utils';

/*
 * useFetchSearch
 */
export const useFetchSearch = () => {
  const service = GithubService();
  const dispatch = useDispatch();
  const fetchSearch = (request: SearchRequest) => {
    dispatch(searchActions.fetchSearch(service)(dispatch)(request));
  };
  return fetchSearch;
};

/*
 * useClearResults
 */
export const useClearResults = () => {
  const dispatch = useDispatch();
  const clearResults = () => {
    dispatch(searchActions.clearResults());
  };
  return clearResults;
};

/*
 * useSetQuery
 */
export const useSetQuery = (request: SearchRequest) => {
  const fetchSearch = useFetchSearch();
  const clearResults = useClearResults();
  const setQuery = (q: string) => {
    if (q.length) {
      fetchSearch({ ...request, page: 1, q });
    } else {
      clearResults();
    }
  };
  return setQuery;
};

/*
 * useSetPaging
 */
export const useSetPaging = (request: SearchRequest) => {
  const fetchSearch = useFetchSearch();
  const setPaging = (page: number, pageSize?: number) => {
    const per_page: number = pageSize || request.per_page;
    fetchSearch({ ...request, page, per_page });
  };
  return setPaging;
};

/*
 * useSetSorting
 */
export const useSetSorting = (request: SearchRequest) => {
  const fetchSearch = useFetchSearch();
  const setSorting = (
    sort?: SearchRequest['sort'],
    order?: SearchRequest['order']
  ) => {
    fetchSearch({ ...request, sort, order });
  };
  return setSorting;
};

/*
 * useRemoveFilter
 */
export const useRemoveFilter = (request: SearchRequest) => {
  const setQuery = useSetQuery(request);
  const removeFilter = (filter: string) => {
    const newQuery = utils.trimWords(request.q.split(filter).join(''));
    setQuery(newQuery);
  };
  return removeFilter;
};

/*
 * useAddFilter
 */
export const useAddFilter = (request: SearchRequest) => {
  const setQuery = useSetQuery(request);
  const addFilter = (filter: string) => {
    const newQuery = utils.trimWords(`${request.q} ${filter}`);
    setQuery(newQuery);
  };
  return addFilter;
};

/*
 * useRemoveFilteredLanguage
 */
export const useRemoveFilteredLanguage = (request: SearchRequest) => {
  const removeFilter = useRemoveFilter(request);
  const removeFilteredLanguage = (language: string) => {
    removeFilter(`language:${language.replace(' ', '-')}`);
  };
  return removeFilteredLanguage;
};

/*
 * useAddFilteredLanguage
 */
export const useAddFilteredLanguage = (request: SearchRequest) => {
  const addFilter = useAddFilter(request);
  const addFilteredLanguage = (language: string) => {
    addFilter(`language:${language.replace(' ', '-')}`);
  };
  return addFilteredLanguage;
};
