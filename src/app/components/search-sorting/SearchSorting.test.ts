import { Select } from 'antd';
import storyMounter from '../../../core/utils/story-mounter';
import snapshotTests from '../../../core/utils/story-snapshot-tests';
import { storyWrapper } from '../../../core/utils/story-builder';
import { makeStories } from './SearchSorting.stories';
import SearchSorting from './SearchSorting';
import { beforeEach, describe } from 'window-or-global';

const mockActions = {
  setSorting: jest.fn(),
};

const stories = storyWrapper(makeStories(mockActions));
const mountedStories = storyMounter(stories, SearchSorting, (component) => ({
  select: component.find(Select),
}));

describe('components/search-sorting', () => {
  describe('snapshots', () => {
    snapshotTests(stories);
  });

  describe('actions', () => {
    Object.keys(mountedStories).forEach((key) => {
      const story = mountedStories[key];
      const { sort, order } = story.props;
      const { select } = story.elements;
      describe(`${key} story`, () => {
        describe('first select box', () => {
          const firstSelect = select.first();
          it('should exist', () => {
            expect(firstSelect.length).toBe(1);
          });
          describe('onChange', () => {
            const { onChange } = firstSelect.props();
            [0, 'stars', 'forks', 'help-wanted-issues', 'updated'].forEach(
              (value) => {
                describe(`${value || 'best match'} selected`, () => {
                  beforeEach(jest.clearAllMocks);
                  it('should call setSorting', () => {
                    expect(mockActions.setSorting).not.toHaveBeenCalled();
                    onChange(value);
                    expect(mockActions.setSorting).toHaveBeenCalled();
                  });
                  if (value) {
                    it(`should pass '${value}' as first arg to setSorting`, () => {
                      expect(mockActions.setSorting).not.toHaveBeenCalled();
                      onChange(value);
                      expect(mockActions.setSorting).toHaveBeenCalled();
                      const args = mockActions.setSorting.mock.calls[0];
                      expect(args[0]).toEqual(value);
                    });
                    if (order) {
                      it(`should pass '${order}' as second arg to setSorting`, () => {
                        expect(mockActions.setSorting).not.toHaveBeenCalled();
                        onChange(value);
                        expect(mockActions.setSorting).toHaveBeenCalled();
                        const args = mockActions.setSorting.mock.calls[0];
                        expect(args[1]).toEqual(order);
                      });
                    } else {
                      it('should pass \'desc\' as second arg to setSorting', () => {
                        expect(mockActions.setSorting).not.toHaveBeenCalled();
                        onChange(value);
                        expect(mockActions.setSorting).toHaveBeenCalled();
                        const args = mockActions.setSorting.mock.calls[0];
                        expect(args[1]).toEqual('desc');
                      });
                    }
                  } else {
                    it('should pass no args to setSorting', () => {
                      expect(mockActions.setSorting).not.toHaveBeenCalled();
                      onChange(value);
                      expect(mockActions.setSorting).toHaveBeenCalled();
                      const args = mockActions.setSorting.mock.calls[0];
                      expect(args.length).toEqual(0);
                    });
                  }
                });
              }
            );
          });
        });

        if (sort) {
          describe('second select box', () => {
            const secondSelect = select.at(1);
            it('should exist', () => {
              expect(secondSelect.length).toBe(1);
            });
            describe('onChange', () => {
              const { onChange } = secondSelect.props();
              beforeEach(jest.clearAllMocks);
              it('should always call setSorting', () => {
                expect(mockActions.setSorting).not.toHaveBeenCalled();
                onChange('asc');
                expect(mockActions.setSorting).toHaveBeenCalled();
              });
              ['asc', 'desc'].forEach((value) => {
                describe(`${value} selected`, () => {
                  beforeEach(jest.clearAllMocks);
                  it('should call setSorting', () => {
                    expect(mockActions.setSorting).not.toHaveBeenCalled();
                    onChange(value);
                    expect(mockActions.setSorting).toHaveBeenCalled();
                  });
                  it(`should pass '${sort}' as first arg to setSorting`, () => {
                    expect(mockActions.setSorting).not.toHaveBeenCalled();
                    onChange(value);
                    expect(mockActions.setSorting).toHaveBeenCalled();
                    const args = mockActions.setSorting.mock.calls[0];
                    expect(args[0]).toEqual(sort);
                  });
                  it(`should pass '${value}' as second arg to setSorting`, () => {
                    expect(mockActions.setSorting).not.toHaveBeenCalled();
                    onChange(value);
                    expect(mockActions.setSorting).toHaveBeenCalled();
                    const args = mockActions.setSorting.mock.calls[0];
                    expect(args[1]).toEqual(value);
                  });
                });
              });
            });
          });
        }
      });
    });
  });
});
