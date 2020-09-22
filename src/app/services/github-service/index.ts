import axios, { AxiosInstance } from 'axios';
import config from '../../config';
import GithubService from './GithubService';

export { default as GithubService } from './GithubService';
export * from './types';

export const mockGitHubService = (mockAxios: AxiosInstance) => {
  const mockBase = 'http://no.where';
  const mockToken = 'foobar';
  return new GithubService(mockBase, mockToken, mockAxios);
};

export default () =>
  new GithubService(config.gitHubBase, config.gitHubToken, axios);
