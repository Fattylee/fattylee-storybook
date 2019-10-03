import uuid from 'uuid';
import * as types from './types';

export const addExpense = ({
  description = '',
  amount = 0,
  createdAt = Date.now(),
  note = '',} = {}) => ({
    type: types.ADD_EXPENSE,
    expense: {
      id: uuid(),
      description,
      amount,
      createdAt,
      note,
    },
});

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

