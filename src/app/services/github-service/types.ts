import { AxiosResponse } from 'axios';
import { User, Repository } from '../../types';

export interface ApiError {
  message: string;
  documentation_url: string;
}

export interface Page<Type> {
  total_count: number;
  incomplete_results?: boolean;
  items: Type[];
}

export type ErrorResponse = AxiosResponse<ApiError>;
export type UserResponse = AxiosResponse<User>;
export type SearchResponse = AxiosResponse<Page<Repository>>;
export type RepositoryResponse = AxiosResponse<Repository>;

export interface SearchRequest {
  q: string;
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  order?: 'asc' | 'desc';
  per_page: number;
  page: number;
}

export interface GithubServiceInterface {
  getCurrentUser: () => Promise<User>;
  getUserByLogin: (login: string) => Promise<User>;
  searchRepositories: (params: SearchRequest) => Promise<Page<Repository>>;
  getRepositoryByFullName: (fullName: string) => Promise<Repository>;
}
