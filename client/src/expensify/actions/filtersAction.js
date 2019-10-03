import * as types from './types';

export const setTextFilter = (text = '') => ({
  type: types.SET_TEXT_FILTER,
  text,
});

export const setStartDate = (startDate) => ({
  type: types.SET_START_DATE,
  startDate,
});

export const setEndDate = (endDate) => ({
  type: types.SET_END_DATE,
  endDate,
});

export const sortByAmount = () => ({
  type: types.SORT_BY_AMOUNT,
  sortBy: 'amount',
});

export const sortByDate = () => ({
  type: types.SORT_BY_DATE,
  sortBy: 'date',
});

