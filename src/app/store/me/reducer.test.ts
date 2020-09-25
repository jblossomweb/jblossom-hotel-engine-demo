import cloneDeep from 'lodash.clonedeep';
import mockUser from '../../__mocks__/github-user.json';
import { User } from '../../types';
import { MeActions } from './types';
import initialState from './initialState';
import * as reducers from './reducers';
import searchReducer from './reducer';

const mockActions: MeActions = {
  FETCH_ME_USER: {
    type: 'FETCH_ME_USER',
  },
  FETCH_ME_USER_SUCCESS: {
    type: 'FETCH_ME_USER_SUCCESS',
    payload: {
      user: mockUser as User,
    },
  },
  FETCH_ME_USER_ERROR: {
    type: 'FETCH_ME_USER_ERROR',
    payload: {
      error: new Error('uh oh'),
    },
  },
  CLEAR_ERROR: {
    type: 'CLEAR_ERROR',
  },
};

const reducerSpies = {
  fetchMeUser: jest.spyOn(reducers, 'fetchMeUser'),
  fetchMeUserSuccess: jest.spyOn(reducers, 'fetchMeUserSuccess'),
  fetchMeUserError: jest.spyOn(reducers, 'fetchMeUserError'),
  clearError: jest.spyOn(reducers, 'clearError'),
};

describe('store/me/reducer', () => {
  describe('FETCH_ME_USER', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchMeUser reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions.FETCH_ME_USER;
      expect(reducerSpies.fetchMeUser).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchMeUser).toHaveBeenCalled();
    });
  });

  describe('FETCH_ME_USER_SUCCESS', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchMeUserSuccess reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions.FETCH_ME_USER_SUCCESS;
      expect(reducerSpies.fetchMeUserSuccess).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchMeUserSuccess).toHaveBeenCalled();
    });
  });

  describe('FETCH_ME_USER_ERROR', () => {
    beforeEach(jest.clearAllMocks);
    it('should call fetchMeUserError reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions.FETCH_ME_USER_ERROR;
      expect(reducerSpies.fetchMeUserError).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.fetchMeUserError).toHaveBeenCalled();
    });
  });

  describe('CLEAR_ERROR', () => {
    beforeEach(jest.clearAllMocks);
    it('should call clearError reducer', () => {
      const state = cloneDeep(initialState);
      const action = mockActions.CLEAR_ERROR;
      expect(reducerSpies.clearError).not.toHaveBeenCalled();
      searchReducer(state, action);
      expect(reducerSpies.clearError).toHaveBeenCalled();
    });
  });
});
