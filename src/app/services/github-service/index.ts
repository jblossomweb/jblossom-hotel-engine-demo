import axios from 'axios';
import config from '../../config';
import GithubService from './GithubService';

export { default as GithubService } from './GithubService';
export * from './types';

export default () =>
  new GithubService(config.gitHubBase, config.gitHubToken, axios);
