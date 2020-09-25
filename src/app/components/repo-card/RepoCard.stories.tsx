import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';

import { Repository } from '../../types';
import mockPage from '../../__mocks__/github-search-repositories.json';
import RepoCard, { Props } from './RepoCard';

const mockRepo = mockPage.items[0] as Repository;

const sampleProps: Props = {
  owner: mockRepo.owner.login,
  name: mockRepo.name,
  description: mockRepo.description,
  stargazers_count: mockRepo.stargazers_count,
  forks_count: mockRepo.forks_count,
  language: mockRepo.language,
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <RepoCard
    owner={knobs.text('owner', props.owner)}
    name={knobs.text('name', props.name)}
    description={knobs.text('description', props.description)}
    stargazers_count={knobs.number('stargazers_count', props.stargazers_count)}
    forks_count={knobs.number('forks_count', props.forks_count)}
    language={knobs.text('language', props.language || '')}
  />
);

export const stories: Stories = {
  sample: story({
    ...sampleProps,
  }),
  'empty language': story({
    ...sampleProps,
    language: '',
  }),
};

storyBuilder(stories, 'components/repo-card');
