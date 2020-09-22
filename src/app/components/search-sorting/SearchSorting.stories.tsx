import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';
import { SearchRequest } from '../../services/github-service/types';
import SearchSorting, { Props } from './SearchSorting';

const sampleProps: Props = {
  setSorting: (
    sort?: SearchRequest['sort'],
    order?: SearchRequest['order']
  ) => {
    console.log(`setSorting('${sort}', '${order}')`);
  },
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <SearchSorting
    loading={knobs.boolean('loading', !!props.loading)}
    sort={knobs.select(
      'sort',
      [0, 'stars', 'forks', 'help-wanted-issues', 'updated'],
      props.sort || 0
    )}
    order={knobs.select('order', ['asc', 'desc'], props.order)}
    setSorting={props.setSorting}
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
  sort: story({
    ...sampleProps,
    sort: 'stars',
    order: 'asc',
  }),
};

storyBuilder(stories, 'components/search-sorting');
