import snapshotTests from '../../../core/utils/story-snapshot-tests';
import storyMounter from '../../../core/utils/story-mounter';
import { storyWrapper } from '../../../core/utils/story-builder';
import RepoDetails from '../../components/repo-details';
import { makeStories } from './RepositoryPage.stories';
import RepositoryPage, { Props } from './RepositoryPage';

const mockActions = {
  refresh: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));
const mountedStories = storyMounter(stories, RepositoryPage, (component) => ({
  repoDetails: component.find(RepoDetails),
}));

describe('pages/repository', () => {
  describe('snapshots', () => {
    snapshotTests(stories);
  });

  describe('plumbing', () => {
    Object.keys(mountedStories).forEach((key) => {
      const story = mountedStories[key];
      const { repo }: Props = story.props;
      if (repo) {
        describe(`${key} story`, () => {
          beforeEach(jest.clearAllMocks);

          it('mounts RepoDetails', () => {
            const { repoDetails } = story.elements;
            expect(repoDetails.length).toEqual(1);
          });

          it('passes repo to RepoDetails', () => {
            const { repoDetails } = story.elements;
            const repoProp = repoDetails.prop('repo');
            expect(repoProp).toEqual(story.props.repo);
          });

          it('passes refresh to RepoDetails', () => {
            const { repoDetails } = story.elements;
            const { refresh } = repoDetails.props();
            expect(refresh).toEqual(story.props.refresh);
          });
        });
      } else {
        describe(`${key} story`, () => {
          beforeEach(jest.clearAllMocks);

          it('does not mount RepoDetails', () => {
            const { repoDetails } = story.elements;
            expect(repoDetails.length).toEqual(0);
          });
        });
      }
    });
  });
});
