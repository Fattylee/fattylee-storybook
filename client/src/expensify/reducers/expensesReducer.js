import uuid from 'uuid';
import * as types from '../actions/types';


const expensesDefaultState = [
  {
    id: '1',
    description: 'rent',
    createdAt: 32,
    amount: 120,
    note: 'rent for the month of september'
  },
  {
    id: '2',
    description: 'gift',
    createdAt: -72,
    amount: 320,
    note: 'bridal gift for our maa shaa Allaah akhi'
  },
  {
    id: '3',
    description: 'phone',
    createdAt: 332,
    amount: 520,
    note: 'the awesome phones are not yet made'
  }
];

const expensesReducer = (state = expensesDefaultState, action)=> {
  switch(action.type) {
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