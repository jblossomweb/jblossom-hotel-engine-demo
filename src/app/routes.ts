/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redirect, Route } from '../core/types';

import NotFoundPage from './pages/not-found';
import HomePage from './pages/home';
import RepositoryPage from './pages/repository';

export interface MenuItem {
  title: string;
  subtitle: string;
  icon: string;
  path: Route['path'];
}

export const paths = {
  HOME: '/home',
  REPOSITORY: '/repos/:owner/:name',
  NOTFOUND: '/404',
};

export const pages: any = {
  [paths.HOME]: HomePage,
  [paths.REPOSITORY]: RepositoryPage,
  [paths.NOTFOUND]: NotFoundPage,
};

export const routes: Route[] = Object.keys(pages).map(
  (path: Route['path']) => ({
    page: pages[path],
    path,
  })
);

export const redirects: Redirect[] = [
  { from: '/', to: paths.HOME },
  { to: '/404' },
];

export default routes;
