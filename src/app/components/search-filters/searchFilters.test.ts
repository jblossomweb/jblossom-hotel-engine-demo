/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag, Select } from 'antd';
import storyMounter from '../../../core/utils/story-mounter';
import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { makeStories } from './SearchFilters.stories';
import SearchFilters, { Props } from './SearchFilters';

const mockActions = {
  addFilteredLanguage: jest.fn(),
  removeFilteredLanguage: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));
const mountedStories = storyMounter(stories, SearchFilters, (component) => ({
  tags: component.find(Tag),
  select: component.find(Select),
}));

describe('components/search-filters', () => {
  describe('snapshots', () => {
    snapshotTests(stories, ['ant-select-selection-search-mirror']);
  });

  describe('actions', () => {
    describe('click language pill x', () => {
      Object.keys(mountedStories).forEach((key) => {
        const story = mountedStories[key];
        const { loading, filteredLanguages }: Props = story.props;
        if (!loading && filteredLanguages?.length) {
          describe(`${key} story`, () => {
            filteredLanguages.forEach((language) => {
              describe(`click ${language} pill x`, () => {
                beforeEach(() => {
                  jest.clearAllMocks();
                });
                it(`calls props.removeFilteredLanguage('${language}')`, () => {
                  const { tags } = story.elements;
                  const tag = tags.filterWhere((node) =>
                    node.text().includes(language)
                  );
                  const xButton = tag
                    .find('[className="ant-tag-close-icon"]')
                    .first();
                  const { removeFilteredLanguage } = mockActions;
                  expect(removeFilteredLanguage).not.toHaveBeenCalled();
                  xButton.simulate('click');
                  expect(removeFilteredLanguage).toHaveBeenCalled();
                  expect(removeFilteredLanguage).toHaveBeenCalledWith(language);
                });
              });
            });
          });
        }
      });
    });

    describe('select a language from dropdown', () => {
      Object.keys(mountedStories).forEach((key) => {
        const story = mountedStories[key];
        const { loading, filteredLanguages }: Props = story.props;
        if (!loading) {
          describe(`${key} story`, () => {
            beforeEach(() => {
              jest.clearAllMocks();
            });
            ['foo', 'bar', 'buzz'].forEach((language) => {
              describe(`select ${language}`, () => {
                beforeEach(() => {
                  jest.clearAllMocks();
                });
                it(`calls props.addFilteredLanguage(${language})`, () => {
                  const { select } = story.elements;
                  const { onChange }: any = select.props();
                  const { addFilteredLanguage } = mockActions;
                  expect(addFilteredLanguage).not.toHaveBeenCalled();
                  onChange([...filteredLanguages, language]);
                  expect(addFilteredLanguage).toHaveBeenCalled();
                  expect(addFilteredLanguage).toHaveBeenCalledWith(language);
                });
              });
            });
          });
        }
      });
    });

    describe('onChange event fires but does not add (edge case)', () => {
      Object.keys(mountedStories).forEach((key) => {
        const story = mountedStories[key];
        const { loading, filteredLanguages }: Props = story.props;
        if (!loading) {
          describe(`${key} story`, () => {
            beforeEach(() => {
              jest.clearAllMocks();
            });
            it('does not call props.addFilteredLanguage', () => {
              const { select } = story.elements;
              const { onChange }: any = select.props();
              const { addFilteredLanguage } = mockActions;
              expect(addFilteredLanguage).not.toHaveBeenCalled();
              onChange(filteredLanguages); // same value as before
              expect(addFilteredLanguage).not.toHaveBeenCalled();
            });
          });
        }
      });
    });

    describe('onChange event fires, adds multiple (edge case)', () => {
      Object.keys(mountedStories).forEach((key) => {
        const story = mountedStories[key];
        const { loading, filteredLanguages }: Props = story.props;
        if (!loading) {
          describe(`${key} story`, () => {
            beforeEach(() => {
              jest.clearAllMocks();
            });
            it('calls props.addFilteredLanguage for each new language', () => {
              const { select } = story.elements;
              const { onChange }: any = select.props();
              const { addFilteredLanguage } = mockActions;
              expect(addFilteredLanguage).not.toHaveBeenCalled();
              onChange([...filteredLanguages, 'foo', 'bar', 'buzz']); // 3 new values
              expect(addFilteredLanguage).toHaveBeenCalledTimes(3);
            });
          });
        }
      });
    });
  });
});
