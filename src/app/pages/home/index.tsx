import React from 'react';
import { useSelector } from 'react-redux';
import * as searchHooks from '../../store/search/hooks';
import * as searchSelectors from '../../store/search/selectors';
import HomePage from './HomePage';

export default () => {
  const searching = useSelector(searchSelectors.selectLoading);
  const pageItems = useSelector(searchSelectors.selectPageItems);
  const numTotalItems = useSelector(searchSelectors.selectNumTotalItems);
  const request = useSelector(searchSelectors.selectRequest);
  const filteredLanguages = useSelector(
    searchSelectors.selectFilteredLanguages
  );

  const search = searchHooks.useSetQuery(request);
  const setPaging = searchHooks.useSetPaging(request);
  const setSorting = searchHooks.useSetSorting(request);
  const removeFilteredLanguage = searchHooks.useRemoveFilteredLanguage(request);
  const addFilteredLanguage = searchHooks.useAddFilteredLanguage(request);

  return (
    <HomePage
      setPaging={setPaging}
      setSorting={setSorting}
      search={search}
      searching={searching}
      request={request}
      filteredLanguages={filteredLanguages}
      addFilteredLanguage={addFilteredLanguage}
      removeFilteredLanguage={removeFilteredLanguage}
      pageItems={pageItems}
      numTotalItems={numTotalItems}
    />
  );
};
