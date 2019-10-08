import {SET_PATHNAME} from './types';

export const setPathname = (pathname = '') => ({
  type: SET_PATHNAME,
  pathname,
});