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
import mockRepo from '../../__mocks__/github-repository.json';
import RepositoryPage, { Props } from './RepositoryPage';

const sampleProps: Props = {
  repo: mockRepo as Repository,
  refresh: () => {
    console.log('refresh()');
  },
};

const mockStore = createStore((state) => state, {});

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <Provider store={mockStore}>
    <RepositoryPage
      loading={knobs.boolean('loading', !!props.loading)}
      repo={knobs.object('repo', props.repo)}
      refresh={props.refresh}
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
  loading: story({
    ...sampleProps,
    ...injectActions,
    loading: true,
  }),
  'no homepage': story({
    ...sampleProps,
    ...injectActions,
    repo: {
      ...sampleProps.repo,
      homepage: null,
    } as Repository,
  }),
  'empty language': story({
    ...sampleProps,
    ...injectActions,
    repo: {
      ...sampleProps.repo,
      language: '',
    } as Repository,
  }),
  'no repo': story({
    ...sampleProps,
    ...injectActions,
    repo: undefined,
  }),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'pages/repository');
