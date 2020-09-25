import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { stories } from './RepoCard.stories';

const wrappedStories = storyWrapper(stories);

describe('components/repo-card', () => {
  snapshotTests(wrappedStories);
});
