import uuid from 'uuid';
import * as types from './types';
import database, {firebase} from '../firebase/firebase';


export const addExpense = ({
  description = '',
  amount = 0,
  createdAt = Date.now(),
  note = '',} = {}) => ({
    type: types.ADD_EXPENSE,
    expense: {
      description,
      amount,
      createdAt,
      note,
    },
});

export const startAddExpense = (expenseData = {}) => {
  const {
    description = '',
    amount = 0,
    createdAt = Date.now(),
    note = '',
  } = expenseData;
  
  const expense = {description, note, createdAt, amount};
  
  return (dispatch) => {
    console.log('working to call firebase');
    database.ref('expenses').push(expense).
    then(ref => {
      console.log("data persisted to firebase database!");
      
      dispatch(addExpense({
        id: ref.key,
        ...expense,
      }));
    })
    .catch(err => {
      console.log('something went wrong!', err);
    });
  };
};

export const removeExpense = (id) => ({
  type: types.REMOVE_EXPENSE,
  id,
});

export const editExpense = (id, expense = {}) => {
  
  const update = {};
  if(typeof expense.description !== 'undefined') {
    update.description = expense.description; 
  }
  if(typeof expense.amount !== 'undefined') {
    update.amount = expense.amount;
  }
  if(typeof expense.createdAt !== 'undefined') {
    update.createdAt = expense.createdAt;
  }
  if(typeof expense.note !== 'undefined') {
    update.note = expense.note;
  }
  
  return {
    type: types.EDIT_EXPENSE,
    id,
    expense: {
     ...update
    },
  };
};