import { useDispatch } from 'react-redux';

import GithubService from '../../services/github-service';
import * as reposActions from './actions';

/*
 * useFetchRepository
 */
export const useFetchRepository = () => {
  const service = GithubService();
  const dispatch = useDispatch();
  const fetchRepository = (fullName: string) => {
    dispatch(reposActions.fetchRepository(service)(dispatch)(fullName));
  };
  return fetchRepository;
};
