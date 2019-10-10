import * as types from '../actions/types';
import moment from 'moment';


const filtersDefaultState = {
  startDate: moment(0).startOf('year'),
  endDate: moment().endOf('year'),
  sortBy: 'date', // amount or other criteria
  text: '',
};


const filtersReducer = (state = filtersDefaultState, action)=> {
  switch(action.type) {
    case types.SET_TEXT_FILTER:
     return {
       ...state,
       text: action.text,
     };
    case types.SET_START_DATE:
     return {
       ...state,
       startDate: action.startDate,
     };
    case types.SET_END_DATE:
     return {
       ...state,
       endDate: action.endDate,
     };
    case types.SORT_BY_AMOUNT:
     return {
       ...state,
       sortBy: action.sortBy,
     };
    case types.SORT_BY_DATE:
     return {
       ...state,
       sortBy: action.sortBy,
     };
    default:
      return state;
  }
};

export default filtersReducer;