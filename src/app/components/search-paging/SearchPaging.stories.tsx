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

export const stories: Stories = {
  sample: story({
    ...sampleProps,
  }),
  loading: story({
    ...sampleProps,
    loading: true,
  }),
};

storyBuilder(stories, 'components/search-paging');
