import { act } from 'react-dom/test-utils';
import { Input } from 'antd';
import storyMounter from '../../../core/utils/story-mounter';
import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { randomString, randomInteger } from '../../../core/utils/test-utils';
import { makeStories } from './SearchInput.stories';
import { describe } from 'window-or-global';
import SearchInput from './SearchInput';

const mockActions = {
  search: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));
const mountedStories = storyMounter(stories, SearchInput, (component) => ({
  inputSearch: component.find(Input.Search),
}));

describe('components/search-input', () => {
  describe('snapshots', () => {
    snapshotTests(stories);
  });

  describe('actions', () => {
    describe('edit search field', () => {
      Object.keys(mountedStories).forEach((key) => {
        const story = mountedStories[key];
        describe(`${key} story`, () => {
          beforeEach(() => {
            jest.clearAllMocks();
          });
          it('should change value', () => {
            const { inputSearch } = story.elements;
            const { query } = story.props;
            const { onChange, value }: any = inputSearch.props();

            let newValue: string = randomString(randomInteger(5, 10));
            if (value === query) {
              // in case it ever matches
              newValue = randomString(randomInteger(5, 10));
            }

            expect(value).not.toEqual(newValue);
            act(() => {
              onChange({ target: { value: newValue } });
            });
            story.wrapper.update();
            const updated = story.wrapper.find(Input.Search);
            expect(updated.prop('value')).toEqual(newValue);
          });
        });
      });
    });
  });
});
