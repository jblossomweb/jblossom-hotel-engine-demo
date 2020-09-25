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
  filter: story({
    ...sampleProps,
    ...injectActions,
    filteredLanguages: ['TypeScript'],
  }),
  filters: story({
    ...sampleProps,
    ...injectActions,
    filteredLanguages: ['TypeScript', 'JavaScript'],
  }),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'components/search-filters');
