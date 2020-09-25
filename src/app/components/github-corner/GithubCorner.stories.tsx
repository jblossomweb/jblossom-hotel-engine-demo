import React from 'react';
import {
  storyBuilder,
  KnobsInterface,
  Stories,
} from '../../../core/utils/story-builder';

import GithubCorner, { Props } from './GithubCorner';

const sampleProps: Props = {
  href: 'https://github.com/jblossomweb/jblossom-hotel-engine-demo',
};

const story = (knobProps: Props) => (
  knobs: KnobsInterface,
  props: Props = knobProps
) => (
  <GithubCorner
    href={knobs.text('href', props.href)}
    fillColor={knobs.color('fillColor', props.fillColor || '')}
    textColor={knobs.color('textColor', props.textColor || '')}
  />
);

export const stories: Stories = {
  sample: story({
    ...sampleProps,
  }),
  fillColor: story({
    ...sampleProps,
    fillColor: '#bada55',
  }),
  textColor: story({
    ...sampleProps,
    textColor: '#bada55',
  }),
};

storyBuilder(stories, 'components/github-corner');
