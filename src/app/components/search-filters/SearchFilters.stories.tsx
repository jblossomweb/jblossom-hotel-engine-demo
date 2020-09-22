import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';
import SearchFilters, { Props } from './SearchFilters';

const sampleProps: Props = {
  filteredLanguages: [],
  addFilteredLanguage: (language: string) => {
    console.log(`addFilteredLanguage('${language}')`);
  },
  removeFilteredLanguage: (language: string) => {
    console.log(`removeFilteredLanguage('${language}')`);
  },
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <SearchFilters
    loading={knobs.boolean('loading', !!props.loading)}
    filteredLanguages={knobs.object(
      'filteredLanguages',
      props.filteredLanguages
    )}
    addFilteredLanguage={props.addFilteredLanguage}
    removeFilteredLanguage={props.removeFilteredLanguage}
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
  filter: story({
    ...sampleProps,
    filteredLanguages: ['TypeScript'],
  }),
  filters: story({
    ...sampleProps,
    filteredLanguages: ['TypeScript', 'JavaScript'],
  }),
};

storyBuilder(stories, 'components/search-filters');
