/* eslint-disable @typescript-eslint/no-explicit-any */
import setWith from 'lodash.setwith';
import cloneDeep from 'lodash.clonedeep';
import mockPage from '../../__mocks__/github-search-repositories.json';
import mockRequest from '../../services/github-service/__mocks__/search_request.json';
import { AppState } from '../types';
import initialState from '../initialState';
import paths, { rootPath } from './paths';
import * as selectors from './selectors';

const setupState = (path?: string[], value?: any | Error) => {
  const state: AppState = cloneDeep(initialState);
  path && setWith(state, [rootPath, ...path], cloneDeep(value));
  return state;
};

describe('store/search/selectors', () => {
  describe('selectPage', () => {
    it('should select page', () => {
      const state = setupState(paths.page(), mockPage);
      const selected = selectors.selectPage(state);
      expect(selected).toEqual(mockPage);
    });
  });

  describe('selectPageItems', () => {
    const state = setupState(paths.page(), mockPage);
    it('should select page.items', () => {
      const selected = selectors.selectPageItems(state);
      expect(selected).toEqual(mockPage.items);
    });
  });

  describe('selectNumTotalItems', () => {
    it('should select total number of items', () => {
      const state = setupState(paths.page(), mockPage);
      const selected = selectors.selectNumTotalItems(state);
      expect(selected).toEqual(mockPage.total_count);
    });

    it('should select 0 if undefined', () => {
      const state = setupState(paths.page(), {
        ...cloneDeep(mockPage),
        total_count: undefined,
      });
      const selected = selectors.selectNumTotalItems(state);
      expect(selected).toEqual(0);
    });
  });

  describe('selectRequest', () => {
    it('should select request', () => {
      const state = setupState(paths.request(), mockRequest);
      const selected = selectors.selectRequest(state);
      expect(selected).toEqual(mockRequest);
    });

    it('should select a default if undefined', () => {
      const state = setupState(paths.request(), undefined);
      const selected = selectors.selectRequest(state);
      expect(selected).toEqual(initialState.search.request);
    });
  });

  describe('selectPageNum', () => {
    const state = setupState(paths.request(), mockRequest);
    it('should select request.page', () => {
      const selected = selectors.selectPageNum(state);
      expect(selected).toEqual(mockRequest.page);
    });
  });

  describe('selectPageSize', () => {
    const state = setupState(paths.request(), mockRequest);
    it('should select request.per_page', () => {
      const selected = selectors.selectPageSize(state);
      expect(selected).toEqual(mockRequest.per_page);
    });
  });

  describe('selectNumTotalPages', () => {
    it('should select total number of pages', () => {
      const state = {
        ...setupState(paths.request(), { ...mockRequest, per_page: 10 }),
        ...setupState(paths.page(), { ...mockPage, total_count: 100 }),
      };
      const selected = selectors.selectNumTotalPages(state);
      expect(selected).toEqual(10);
    });

    it('should select total number of pages when last page is not full', () => {
      const state = {
        ...setupState(paths.request(), { ...mockRequest, per_page: 10 }),
        ...setupState(paths.page(), { ...mockPage, total_count: 101 }),
      };
      const selected = selectors.selectNumTotalPages(state);
      expect(selected).toEqual(11);
    });
  });

  describe('selectSort', () => {
    const state = setupState(paths.request(), mockRequest);
    it('should select request.sort', () => {
      const selected = selectors.selectSort(state);
      expect(selected).toEqual(mockRequest.sort);
    });
  });

  describe('selectOrder', () => {
    const state = setupState(paths.request(), mockRequest);
    it('should select request.order', () => {
      const selected = selectors.selectOrder(state);
      expect(selected).toEqual(mockRequest.order);
    });
  });

  describe('selectFilters', () => {
    const state = setupState(paths.request(), {
      ...mockRequest,
      q: 'foo:bar bar:foo',
    });
    it('should select array of filter key:value strings from request', () => {
      const selected = selectors.selectFilters(state);
      expect(selected).toEqual(['foo:bar', 'bar:foo']);
    });
  });

  describe('selectFilteredLanguages', () => {
    it('should select array of filtered language values', () => {
      const state = setupState(paths.request(), {
        ...mockRequest,
        q: 'language:JavaScript language:Typescript',
      });
      const selected = selectors.selectFilteredLanguages(state);
      expect(selected).toEqual(['JavaScript', 'Typescript']);
    });

    it('should not select non-language filters', () => {
      const state = setupState(paths.request(), {
        ...mockRequest,
        q: 'language:JavaScript language:Typescript foo:bar bar:foo',
      });
      const selected = selectors.selectFilteredLanguages(state);
      expect(selected).toEqual(['JavaScript', 'Typescript']);
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

    it('should select false when loading is undefined', () => {
      const state = setupState(paths.loading(), undefined);
      const selected = selectors.selectLoading(state);
      expect(selected).toEqual(false);
    });
  });

  describe('selectError', () => {
    it('should select error if defined', () => {
      const error = cloneDeep(new Error('uh oh'));
      const state = setupState(paths.error(), error);
      const selected = selectors.selectError(state);
      expect(selected).toEqual(error);
    });

    it('should select undefined when error is undefined', () => {
      const state = setupState(paths.error(), undefined);
      const selected = selectors.selectError(state);
      expect(selected).toEqual(undefined);
    });
  });
});
