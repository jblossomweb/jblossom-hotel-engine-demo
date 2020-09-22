import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification as notify } from 'antd';
import { ApiError } from '../../services/github-service/types';

import * as meActions from '../../store/me/actions';
import * as searchActions from '../../store/search/actions';
import * as reposActions from '../../store/repos/actions';

import * as meSelectors from '../../store/me/selectors';
import * as searchSelectors from '../../store/search/selectors';
import * as reposSelectors from '../../store/repos/selectors';

/*
 * useErrorEffect
 */
export const useErrorEffect = (
  error: Error | ApiError,
  closeError: () => void
) =>
  useEffect(() => {
    if (error) {
      const message: string = 'Error';
      const description: string = error.message || 'System Error';
      notify.error({
        message,
        description,
        duration: 0, // does not auto-close
        onClose: closeError,
      });
    }
  }, [error, closeError]);

/*
 * useErrorHandling
 */
export const useErrorHandling = () => {
  const dispatch = useDispatch();
  const meError = useSelector(meSelectors.selectError);
  const searchError = useSelector(searchSelectors.selectError);
  const reposError = useSelector(reposSelectors.selectError);

  const clearMeError = () => {
    dispatch(meActions.clearError());
  };

  const clearSearchError = () => {
    dispatch(searchActions.clearError());
  };

  const clearReposError = () => {
    dispatch(reposActions.clearError());
  };

  useErrorEffect(meError, clearMeError);
  useErrorEffect(searchError, clearSearchError);
  useErrorEffect(reposError, clearReposError);
};
