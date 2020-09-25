import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { stories } from './GithubCorner.stories';

describe('components/github-corner', () => {
  describe('snapshots', () => {
    snapshotTests(stories);
  });
});
