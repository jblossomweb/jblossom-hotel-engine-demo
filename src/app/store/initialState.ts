import { AppState } from './types';

import me from './me/initialState';
import search from './search/initialState';
import repos from './repos/initialState';

const initialState: AppState = {
  me,
  search,
  repos,
};

export default initialState;
