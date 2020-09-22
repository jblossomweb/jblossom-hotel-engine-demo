import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as reposHooks from '../../store/repos/hooks';
import * as reposSelectors from '../../store/repos/selectors';

import RepositoryPage from './RepositoryPage';
import { Repository } from '../../types';

interface Params {
  name: string;
  owner: string;
}

export default () => {
  const { owner, name } = useParams() as Params;
  const fullName = `${owner}/${name}`;
  const loading = useSelector(reposSelectors.selectLoading);
  const error = useSelector(reposSelectors.selectError);
  const repos = useSelector(reposSelectors.selectRepos);
  const fetchRepo = reposHooks.useFetchRepository();

  const repo: Repository = repos[fullName];

  useEffect(() => {
    if (!repo && !loading && !error) {
      fetchRepo(fullName);
    }
  }, [loading, repo, error, fullName, fetchRepo]);

  return (
    <RepositoryPage
      loading={loading}
      repo={repo}
      refresh={() => fetchRepo(fullName)}
    />
  );
};
