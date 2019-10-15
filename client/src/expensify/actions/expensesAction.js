import uuid from 'uuid';
import * as types from './types';
import database, {firebase} from '../firebase/firebase';
import configureStore from '../store/configureStore';


export const getInit = () => dispatch => {
  
  return new Promise((resolve, reject) => {
    
  database.ref('expenses').on('value', (snapshot => {
  const expenses = [];
  snapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });
  dispatch({type: 'INITME', expenses}); 
  resolve();
}), (err => {
  console.log('couldnot fetch expenses from firebase, try again', err.message);
  reject(err);
}));
  });

};

//configureStore().dispatch(getInit());

export const addExpense = ({
  description = '',
  amount = 0,
  createdAt = Date.now(),
  note = '',} = {}) => dispatch => 
  {
  database
  .ref('expenses')
  .push({description, amount, createdAt, note})
  .then(ref => {
      console.log("data persisted to firebase database!");
      
   /* dispatch({
    type: types.ADD_EXPENSE,
    expense: {
      id: ref.key,
      description,
      amount,
      createdAt,
      note,
    },
    });*/
    
    })
    .catch(err => {
      console.log('something went wrong!', err);
    });
}

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

export const removeExpense = (id) => dispatch => { 
database.ref('expenses/' + id).remove()
.then(ref => {
  
})
.catch(err => {
  console.log('could not delete expense', err.message);
});
}
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
  
  return database.ref('expenses/' + id).update({...update})
  .then( ref => {
    
  /*  return dispatch({
    type: types.EDIT_EXPENSE,
    id,
    expense: {
     ...update
    },
  });*/
  })
  .catch(err => {
    console.log('could not update expense with ID: ' +id, err.message);
  });
};