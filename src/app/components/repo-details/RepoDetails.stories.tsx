/* eslint-disable no-console */
import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';

import { Repository } from '../../types';
import mockRepo from '../../__mocks__/github-repository.json';
import RepoDetails, { Props } from './RepoDetails';

const sampleProps: Props = {
  repo: mockRepo as Repository,
  refresh: () => {
    console.log('refresh()');
  },
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <RepoDetails
    repo={knobs.object('repo', props.repo)}
    refresh={props.refresh}
  />
);

export const makeStories: (injectActions?: Partial<Props>) => Stories = (
  injectActions
) => ({
  sample: story({
    ...sampleProps,
    ...injectActions,
  }),
  'no homepage': story({
    ...sampleProps,
    ...injectActions,
    repo: {
      ...sampleProps.repo,
      homepage: null,
    },
  }),
  'empty language': story({
    ...sampleProps,
    ...injectActions,
    repo: {
      ...sampleProps.repo,
      language: '',
    },
  }),
});

export const stories: Stories = makeStories();

storyBuilder(stories, 'components/repo-details');
