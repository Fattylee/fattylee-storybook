import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import filtersReducer from './filtersReducer';
import expensesReducer from './expensesReducer';
import pathnameReducer from './pathnameReducer';
import isLoadingReducer from './isLoadingReducer';


export default combineReducers({
  users: usersReducer,
  filters: filtersReducer,
  expenses: expensesReducer,
  pathname: pathnameReducer,
  IS_DESKTOP: () => window.innerWidth > 440 ,
  IS_LOADING: isLoadingReducer,
});