/* eslint-disable no-console */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';
import { Repository } from '../../types';
import { SearchRequest } from '../../services/github-service/types';
import mockRequest from '../../services/github-service/__mocks__/search_request.json';
import mockPage from '../../__mocks__/github-search-repositories.json';
import HomePage, { Props } from './HomePage';

const sampleProps: Props = {
  request: mockRequest as SearchRequest,
  filteredLanguages: [],
  pageItems: mockPage.items as Repository[],
  numTotalItems: mockPage.total_count,
  search: (query: string) => {
    console.log(`search('${query}')`);
  },
  addFilteredLanguage: (language: string) => {
    console.log(`addFilteredLanguage('${language}')`);
  },
  removeFilteredLanguage: (language: string) => {
    console.log(`removeFilteredLanguage('${language}')`);
  },
  setPaging: (pageNum: number, pageSize?: number) => {
    console.log(`setPaging(${pageNum},${pageSize})`);
  },
  setSorting: (
    sort?: SearchRequest['sort'],
    order?: SearchRequest['order']
  ) => {
    console.log(`setSorting('${sort}','${order})'`);
  },
};

const mockStore = createStore((state) => state, {});

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <Provider store={mockStore}>
    <HomePage
      searching={knobs.boolean('searching', !!props.searching)}
      numTotalItems={knobs.number('numTotalItems', props.numTotalItems)}
      request={knobs.object('request', props.request)}
      filteredLanguages={knobs.object(
        'filteredLanguages',
        props.filteredLanguages
      )}
      pageItems={knobs.object('pageItems', props.pageItems)}
      search={props.search}
      addFilteredLanguage={props.addFilteredLanguage}
      removeFilteredLanguage={props.removeFilteredLanguage}
      setPaging={props.setPaging}
      setSorting={props.setSorting}
    />
  </Provider>
);

export const makeStories: (injectActions?: Partial<Props>) => Stories = (
  injectActions
) => ({
  sample: story({
    ...sampleProps,
    ...injectActions,
  }),
  searching: story({
    ...sampleProps,
    ...injectActions,
    searching: true,
  }),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'pages/home');
