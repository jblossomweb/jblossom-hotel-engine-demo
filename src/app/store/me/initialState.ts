import { AppState } from '../types';

const initialState: AppState['me'] = {
  user: undefined,
  loading: false,
  loaded: false,
  error: undefined,
};

export default initialState;
