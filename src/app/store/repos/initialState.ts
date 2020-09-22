import { AppState } from '../types';

const initialState: AppState['repos'] = {
  repos: {},
  loading: false,
  error: undefined,
};

export default initialState;
