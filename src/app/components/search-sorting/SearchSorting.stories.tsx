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
  ...['stars', 'forks', 'help-wanted-issues', 'updated'].reduce(
    (fields, field) => ({
      ...fields,
      ...['asc', 'desc'].reduce(
        (dirs, dir) => ({
          ...dirs,
          [`sort by ${field} ${dir}`]: story({
            ...sampleProps,
            ...injectActions,
            sort: field as Props['sort'],
            order: dir as Props['order'],
          }),
          [`sort by ${field}, order is undefined (edge case)`]: story({
            ...sampleProps,
            ...injectActions,
            sort: field as Props['sort'],
            order: undefined,
          }),
        }),
        {}
      ),
    }),
    {}
  ),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'components/search-sorting');
