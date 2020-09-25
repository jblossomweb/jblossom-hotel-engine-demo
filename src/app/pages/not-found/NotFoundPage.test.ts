import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { stories } from './NotFoundPage.stories';

const wrappedStories = storyWrapper(stories);

describe('pages/not-found', () => {
  describe('snapshots', () => {
    snapshotTests(wrappedStories);
  });
});
