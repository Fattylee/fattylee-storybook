import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import filtersReducer from './filtersReducer';
import expensesReducer from './expensesReducer';

export default combineReducers({
  users: usersReducer,
  filters: filtersReducer,
  expenses: expensesReducer,
});