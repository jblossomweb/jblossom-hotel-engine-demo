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
  />
);

export const stories: Stories = {
  sample: story({
    ...sampleProps,
  }),
  searching: story({
    ...sampleProps,
    searching: true,
  }),
};

storyBuilder(stories, 'components/search-input');
