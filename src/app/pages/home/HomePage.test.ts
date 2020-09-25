import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { makeStories } from './HomePage.stories';

const mockActions = {
  search: jest.fn(),
  addFilteredLanguage: jest.fn(),
  removeFilteredLanguage: jest.fn(),
  setPaging: jest.fn(),
  setSorting: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));

describe('pages/home', () => {
  describe('snapshots', () => {
    snapshotTests(stories, ['ant-select-selection-search-mirror']);
  });
});
