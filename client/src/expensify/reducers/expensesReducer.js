import * as types from '../actions/types';
import database from '../firebase/firebase';


const expensesReducer =  (state = [], action) => {
  switch(action.type) {
    case types.SET_EXPENSES:
      return action.expenses;
    case types.ADD_EXPENSE:
      return [
       ...state,
       {
         id: uuid(),
         ...action.expense,
       } 
     ];
     case types.REMOVE_EXPENSE:
       return state.filter(expense => action.id !== expense.id);      
     case types.EDIT_EXPENSE: 
       return state.map(expense => {
         if(action.id === expense.id) {
           return {
             ...expense,
             ...action.expense,
           };
         }
         return expense;
       }); 
    default:
      return state;
  }
};

export default expensesReducer;