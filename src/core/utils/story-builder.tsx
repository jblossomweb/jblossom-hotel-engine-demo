/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as knobs from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import 'antd/dist/antd.css';
import Theme from '../../app/theme.style';

const { withKnobs } = knobs;

export interface KnobsInterface {
  text: (name: string, val: string) => string;
  number: (name: string, val: number) => number;
  date: (name: string, val: number) => number;
  color: (name: string, val: string) => string;
  boolean: (name: string, val: boolean) => boolean;
  object: (name: string, val: any) => any;
  select: (name: string, options: any, val: any) => any;
}

export const mockKnobs: KnobsInterface = {
  text: (name: string, val: string) => val,
  number: (name: string, val: number) => val,
  date: (name: string, val: number) => val,
  color: (name: string, val: string) => val,
  boolean: (name: string, val: boolean) => val,
  object: (name: string, val: object) => val,
  select: (name: string, options: any, val: any) => val,
};

export type Story = (...args: any[]) => React.ReactElement;

export interface Stories {
  [key: string]: Story;
}

export const storyWrapper = (stories: Stories) => {
  const wrappedStories: Stories = {};
  Object.keys(stories).forEach((key) => {
    wrappedStories[key] = () => (
      <>
        <Theme />
        <MemoryRouter>{stories[key](knobs)}</MemoryRouter>
      </>
    );
  });
  return wrappedStories;
};

export const storyBuilder = (stories: Stories, storyPath: string) => {
  const wrappedStories: Stories = storyWrapper(stories);
  const builtStories = storiesOf(storyPath, module);
  builtStories.addDecorator(withKnobs as any);
  Object.keys(wrappedStories).forEach((key) => {
    builtStories.add(key, wrappedStories[key]);
  });
};
