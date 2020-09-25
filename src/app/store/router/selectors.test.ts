/* eslint-disable @typescript-eslint/no-explicit-any */
import setWith from 'lodash.setwith';
import cloneDeep from 'lodash.clonedeep';
import { randomString } from '../../../core/utils/test-utils';
import { AppState } from '../types';
import initialState from '../initialState';
import paths, { rootPath } from './paths';
import * as selectors from './selectors';

const setupState = (path?: string[], value?: any | Error) => {
  const state: AppState = cloneDeep(initialState);
  path && setWith(state, [rootPath, ...path], cloneDeep(value));
  return state;
};

describe('store/router/selectors', () => {
  describe('getPathName', () => {
    const pathName = `/${randomString(7)}`;
    const state = setupState(paths.pathName(), pathName);
    it('should select correct value from pathName', () => {
      const selected = selectors.getPathName(state);
      expect(selected).toEqual(pathName);
    });
  });

  describe('getQueryParams', () => {
    const queryParams = { foo: 'bar', buzz: 'boo' };
    const state = setupState(paths.queryParams(), queryParams);
    it('should select correct value from queryParams', () => {
      const selected = selectors.getQueryParams(state);
      expect(selected).toEqual(queryParams);
    });
  });
});
