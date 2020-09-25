import { Pagination } from 'antd';
import storyMounter from '../../../core/utils/story-mounter';
import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { makeStories } from './SearchPaging.stories';
import SearchPaging from './SearchPaging';

const mockActions = {
  setPaging: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));
const mountedStories = storyMounter(stories, SearchPaging, (component) => ({
  pagination: component.find(Pagination),
}));

describe('components/search-paging', () => {
  describe('snapshots', () => {
    snapshotTests(stories);
  });

  describe('plumbing', () => {
    Object.keys(mountedStories).forEach((key) => {
      const story = mountedStories[key];
      describe(`${key} story`, () => {
        it('should pass setPaging to Pagination onChange', () => {
          const { pagination } = story.elements;
          const { onChange } = pagination.props();
          expect(onChange).toEqual(story.props.setPaging);
        });
      });
    });
  });
});
