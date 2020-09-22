import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';

import { Repository } from '../../types';
import mockPage from '../../__mocks__/github-search-repositories.json';
import RepoDetails, { Props } from './RepoDetails';

const mockRepo = mockPage.items[0] as Repository;

const sampleProps: Props = {
  repo: mockRepo,
  refresh: () => {
    console.log(`refresh()`);
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

export const stories: Stories = {
  sample: story({
    ...sampleProps,
  }),
};

storyBuilder(stories, 'components/repo-details');
