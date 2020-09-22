import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import config from '../../config';
import GithubService from '../../services/github-service';

import * as meActions from '../../store/me/actions';
import * as meSelectors from '../../store/me/selectors';

import { useErrorHandling } from './MainTemplate.hooks';
import MainTemplate, { Props } from './MainTemplate';

export default ({ children }: Props) => {
  const service = GithubService();
  const dispatch = useDispatch();

  const meAvatar = useSelector(meSelectors.selectMeAvatar);
  const meAvatarLink = useSelector(meSelectors.selectMeAvatarLink);
  const meLoading = useSelector(meSelectors.selectLoading);
  const meLoaded = useSelector(meSelectors.selectLoaded);
  const meError = useSelector(meSelectors.selectError);

  const fetchMeUser = () => {
    dispatch(meActions.fetchMeUser(service)(dispatch));
  };

  useEffect(() => {
    if (
      !meLoaded &&
      !meLoading &&
      !meError &&
      config.gitHubToken &&
      config.gitHubToken.length
    ) {
      fetchMeUser();
    }
  });

  useErrorHandling();

  return (
    <MainTemplate
      avatar={meAvatar}
      avatarLink={meAvatarLink}
      loading={meLoading}
    >
      {children}
    </MainTemplate>
  );
};
