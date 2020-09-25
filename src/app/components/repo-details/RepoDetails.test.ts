import { SyncOutlined } from '@ant-design/icons';
import storyMounter from '../../../core/utils/story-mounter';
import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { makeStories } from './RepoDetails.stories';
import RepoDetails from './RepoDetails';

const mockActions = {
  refresh: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));
const mountedStories = storyMounter(stories, RepoDetails, (component) => ({
  refreshIcon: component.find(SyncOutlined),
}));

describe('components/repo-details', () => {
  describe('snapshots', () => {
    snapshotTests(stories);
  });

  describe('actions', () => {
    describe('click refresh', () => {
      Object.keys(mountedStories).forEach((key) => {
        describe(`${key} story`, () => {
          beforeEach(() => {
            jest.clearAllMocks();
          });
          it(`calls props.refresh()`, () => {
            const story = mountedStories[key];
            const { refreshIcon } = story.elements;
            const { refresh } = mockActions;
            expect(refresh).not.toHaveBeenCalled();
            refreshIcon.simulate('click');
            expect(refresh).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
