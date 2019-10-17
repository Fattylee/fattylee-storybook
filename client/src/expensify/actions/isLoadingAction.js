import {SET_LOADING} from './types';

export const setLoading = (loadingState = false) => ({
  type: SET_LOADING,
  loadingState,
});

