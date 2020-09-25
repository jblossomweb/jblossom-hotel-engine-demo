import setWith from 'lodash.setwith';
import cloneDeep from 'lodash.clonedeep';
import mockRepo from '../../__mocks__/github-repository.json';
import { AppState } from '../types';
import initialState from '../initialState';
import paths, { rootPath } from './paths';
import * as selectors from './selectors';

const mockRepos = { [mockRepo.full_name]: mockRepo };

const setupState = (path?: string[], value?: any | Error) => {
  const state: AppState = cloneDeep(initialState);
  path && setWith(state, [rootPath, ...path], cloneDeep(value));
  return state;
};

describe('store/repos/selectors', () => {
  describe('selectRepos', () => {
    it('should select repos', () => {
      const state = setupState(paths.repos(), mockRepos);
      const selected = selectors.selectRepos(state);
      expect(selected).toEqual(mockRepos);
    });

    it('should select an empty object if repos is undefined', () => {
      const state = setupState(paths.repos(), undefined);
      const selected = selectors.selectRepos(state);
      expect(selected).toEqual({});
    });
  });

  describe('selectLoading', () => {
    [true, false].forEach((value) => {
      it(`should select ${value} when loading is ${value}`, () => {
        const state = setupState(paths.loading(), value);
        const selected = selectors.selectLoading(state);
        expect(selected).toEqual(value);
      });
    });

    it(`should select false when loading is undefined`, () => {
      const state = setupState(paths.loading(), undefined);
      const selected = selectors.selectLoading(state);
      expect(selected).toEqual(false);
    });
  });

  describe('selectError', () => {
    it(`should select error if defined`, () => {
      const error = cloneDeep(new Error('uh oh'));
      const state = setupState(paths.error(), error);
      const selected = selectors.selectError(state);
      expect(selected).toEqual(error);
    });

    it(`should select undefined when error is undefined`, () => {
      const state = setupState(paths.error(), undefined);
      const selected = selectors.selectError(state);
      expect(selected).toEqual(undefined);
    });
  });
});
