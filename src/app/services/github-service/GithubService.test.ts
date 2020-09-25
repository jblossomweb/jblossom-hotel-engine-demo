import { AxiosInstance } from 'axios';
import { beforeEach } from 'window-or-global';
import { randomString } from '../../../core/utils/test-utils';
import mockRequest from './__mocks__/search_request.json';
import GithubService from './GithubService';
import { SearchRequest } from './types';

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');

const mockBase = 'http://no.where/';
const mockToken = randomString(25);
const mockService = new GithubService(mockBase, mockToken, mockAxios);
const expectedHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${mockToken}`,
  accept: 'application/vnd.github.v3+json',
};

describe('services/github-service', () => {
  describe('getRequest', () => {
    beforeEach(jest.clearAllMocks);

    it('makes a GET request', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      mockService.getRequest('/endpoint');
      expect(mockAxios.get).toHaveBeenCalled();
    });

    it('makes a GET request with expected headers', () => {
      const endpoint = 'endpoint';
      const params = { foo: 'bar' };
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getRequest(endpoint, params);
      const args = spy.mock.calls[0];
      expect(args[1]!.headers).toEqual(expectedHeaders);
    });

    it('makes a GET request to correct endpoint', () => {
      const endpoint = 'endpoint';
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getRequest(endpoint);
      const args = spy.mock.calls[0];
      expect(args[0]).toEqual(`${mockBase}${endpoint}`);
    });

    it('makes a GET request with passed params', () => {
      const endpoint = 'endpoint';
      const params = { foo: 'bar' };
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getRequest(endpoint, params);
      const args = spy.mock.calls[0];
      expect(args[1]!.params).toEqual(params);
    });
  });

  describe('getCurrentUser', () => {
    beforeEach(jest.clearAllMocks);

    it('makes a GET request', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      mockService.getCurrentUser().catch(() => {});
      expect(mockAxios.get).toHaveBeenCalled();
    });

    it('makes a GET request with expected headers', () => {
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getCurrentUser().catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[1]!.headers).toEqual(expectedHeaders);
    });

    it('makes a GET request to user endpoint', () => {
      const endpoint = 'user';
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getCurrentUser().catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[0]).toEqual(`${mockBase}${endpoint}`);
    });
  });

  describe('getUserByLogin', () => {
    beforeEach(jest.clearAllMocks);

    it('makes a GET request', () => {
      const login = 'someUser';
      expect(mockAxios.get).not.toHaveBeenCalled();
      mockService.getUserByLogin(login).catch(() => {});
      expect(mockAxios.get).toHaveBeenCalled();
    });

    it('makes a GET request with expected headers', () => {
      const login = 'someUser';
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getUserByLogin(login).catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[1]!.headers).toEqual(expectedHeaders);
    });

    it('makes a GET request to users/<login> endpoint', () => {
      const login = 'someUser';
      const endpoint = `users/${login}`;
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getUserByLogin(login).catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[0]).toEqual(`${mockBase}${endpoint}`);
    });
  });

  describe('searchRepositories', () => {
    beforeEach(jest.clearAllMocks);

    it('makes a GET request', () => {
      expect(mockAxios.get).not.toHaveBeenCalled();
      mockService
        .searchRepositories(mockRequest as SearchRequest)
        .catch(() => {});
      expect(mockAxios.get).toHaveBeenCalled();
    });

    it('makes a GET request with expected headers', () => {
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService
        .searchRepositories(mockRequest as SearchRequest)
        .catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[1]!.headers).toEqual(expectedHeaders);
    });

    it('makes a GET request to search/repositories endpoint', () => {
      const endpoint = 'search/repositories';
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService
        .searchRepositories(mockRequest as SearchRequest)
        .catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[0]).toEqual(`${mockBase}${endpoint}`);
    });

    it('makes a GET request with argument as querystring', () => {
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService
        .searchRepositories(mockRequest as SearchRequest)
        .catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[1]!.params).toEqual(mockRequest);
    });
  });

  describe('getRepositoryByFullName', () => {
    beforeEach(jest.clearAllMocks);

    it('makes a GET request', () => {
      const fullName = 'some-git-repo';
      expect(mockAxios.get).not.toHaveBeenCalled();
      mockService.getRepositoryByFullName(fullName).catch(() => {});
      expect(mockAxios.get).toHaveBeenCalled();
    });

    it('makes a GET request with expected headers', () => {
      const fullName = 'some-git-repo';
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getRepositoryByFullName(fullName).catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[1]!.headers).toEqual(expectedHeaders);
    });

    it('makes a GET request to repos/<fullName> endpoint', () => {
      const fullName = 'some-git-repo';
      const endpoint = `repos/${fullName}`;
      const spy = jest.spyOn(mockAxios, 'get');
      expect(spy).not.toHaveBeenCalled();
      mockService.getRepositoryByFullName(fullName).catch(() => {});
      const args = spy.mock.calls[0];
      expect(args[0]).toEqual(`${mockBase}${endpoint}`);
    });
  });
});
