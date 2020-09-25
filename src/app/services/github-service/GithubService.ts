import { AxiosInstance } from 'axios';

import {
  GithubServiceInterface,
  UserResponse,
  SearchRequest,
  SearchResponse,
  RepositoryResponse,
} from './types';

class GithubService implements GithubServiceInterface {
  private base: string;
  private token: string;
  private axios: AxiosInstance;

  constructor(base: string, token: string, axios: AxiosInstance) {
    this.base = base;
    this.token = token;
    this.axios = axios;
  }

  public getRequest = (endpoint: string, params?: object) =>
    this.axios.get(this.base + endpoint, {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
        accept: 'application/vnd.github.v3+json',
      },
    });

  public getCurrentUser = async () => {
    const endpoint = `user`;
    try {
      const { data }: UserResponse = await this.getRequest(endpoint);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public getUserByLogin = async (login: string) => {
    const endpoint = `users/${login}`;
    try {
      const { data }: UserResponse = await this.getRequest(endpoint);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public searchRepositories = async (params: SearchRequest) => {
    const endpoint = `search/repositories`;
    try {
      const { data }: SearchResponse = await this.getRequest(endpoint, params);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  public getRepositoryByFullName = async (fullName: string) => {
    const endpoint = `repos/${fullName}`;
    try {
      const { data }: RepositoryResponse = await this.getRequest(endpoint);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default GithubService;
