/* eslint-disable no-console */
import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';
import SearchPaging, { Props } from './SearchPaging';

const sampleProps: Props = {
  totalItems: 250,
  pageNum: 1,
  pageSize: 10,
  setPaging: (pageNum: number, pageSize?: number) => {
    console.log(`setPaging(${pageNum}, ${pageSize})`);
  },
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <SearchPaging
    loading={knobs.boolean('loading', !!props.loading)}
    totalItems={knobs.number('totalItems', props.totalItems)}
    pageNum={knobs.number('pageNum', props.pageNum)}
    pageSize={knobs.number('pageSize', props.pageSize)}
    setPaging={props.setPaging}
  />
);

export const makeStories: (injectActions?: Partial<Props>) => Stories = (
  injectActions
) => ({
  sample: story({
    ...sampleProps,
    ...injectActions,
  }),
  loading: story({
    ...sampleProps,
    ...injectActions,
    loading: true,
  }),
  'zero total items': story({
    ...sampleProps,
    ...injectActions,
    totalItems: 0,
  }),
  '2nd page': story({
    ...sampleProps,
    ...injectActions,
    pageNum: 2,
  }),
  'larger page size': story({
    ...sampleProps,
    ...injectActions,
    pageSize: 100,
  }),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'components/search-paging');
