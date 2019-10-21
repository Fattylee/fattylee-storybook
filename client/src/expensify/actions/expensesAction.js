import * as types from './types';
import database, {firebase} from '../firebase/firebase';
import {setLoading} from './isLoadingAction';


export const getInit = (authUser = {}) => dispatch => {
  
  return new Promise((resolve, reject) => {
    
  database.ref('expenses').on('value', (snapshot => {
    
  const expenses = [];
  snapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });
  
  const filteredExpenses = expenses.filter(expense => expense.owner === authUser.uid);
  
  dispatch({
    type: types.SET_EXPENSES, 
    expenses: filteredExpenses,
  });
  resolve();
}), (err => {
  console.log('couldnot fetch expenses from firebase, try again', err.message);
  reject(err);
}));
  });

}; // end getInit

export const addExpense = ({
  description = '',
  amount = 0,
  createdAt = Date.now(),
  note = '',
  owner,
  } = {}) => dispatch => 
  {
  database
  .ref('expenses')
  .push({description, amount, createdAt, note, owner})
  .then(ref => { 
      dispatch(setLoading());
    })
    .catch(err => {
      console.log('something went wrong! addExpense', err);
    });
};

export const removeExpense = (id) => dispatch => { 
database.ref('expenses/' + id).remove()
.then(ref => {
  dispatch(setLoading());
})
.catch(err => {
  console.log('could not delete expense', err.message);
});
};

export const editExpense = (id, expense = {}) => dispatch => {
  
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
  
  return database.ref('expenses/' + id).update({...update});
 
};

