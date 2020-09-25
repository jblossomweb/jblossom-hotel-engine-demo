import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';
import SearchInput, { Props } from './SearchInput';

const sampleProps: Props = {
  search: (value) => {
    console.log(`search('${value}')`);
  },
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <SearchInput
    search={props.search}
    searching={knobs.boolean('searching', !!props.searching)}
    query={knobs.text('query', props.query || '')}
  />
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
  query: story({
    ...sampleProps,
    ...injectActions,
    query: 'query',
  }),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'components/search-input');
