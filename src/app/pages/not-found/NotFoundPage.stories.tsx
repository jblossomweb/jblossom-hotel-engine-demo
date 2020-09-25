import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storyBuilder, Stories } from '../../../core/utils/story-builder';
import NotFoundPage from './NotFoundPage';

const mockStore = createStore((state) => state, {});

const story = () => () => (
  <Provider store={mockStore}>
    <NotFoundPage />
  </Provider>
);

export const stories: Stories = {
  sample: story(),
};

storyBuilder(stories, 'pages/not-found');
