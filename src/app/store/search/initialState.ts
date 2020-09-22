import { AppState } from '../types';

const initialState: AppState['search'] = {
  request: {
    q: '',
    sort: undefined,
    order: undefined,
    per_page: 10,
    page: 1,
  },
  page: undefined,
  loading: false,
  error: undefined,
};

export default initialState;
