import * as types from './types';

export const setGlobalError = ( globalError ) => ({
  type: types.SET_ERROR,
  globalError,
});