/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from 'redux';
import { RouterState } from './router/types';
import { MeState } from './me/types';
import { SearchState } from './search/types';
import { ReposState } from './repos/types';

export interface AppState {
  router?: RouterState;
  me: MeState;
  search: SearchState;
  repos: ReposState;
}

export interface AppAction extends Action {
  payload?: any;
}
