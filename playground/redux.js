// import redux from 'redux';
const redux = require('redux');
const reduxThunk = require('redux-thunk');
const debug = require('debug')('api:req');
const uuid = require('uuid');

console.log('redux', redux, 'redux-thunk', reduxThunk);


const defaultState = {
  expenses: [{
    id: 1,
    note: 'note 1',
    description: 'description 1', 
    amount: 2373,
    createdAt: 1000
  },{
    id: 2,
    note: 'note 2',
    description: 'description 2', 
    amount: 23,
    createdAt: 500
  }],
  filters: {
    startDate: undefined,
    endDate: undefined,
    text: '',
    sortBy: 'date', // or amount,
  }
};

const expensesReducer = (state = defaultState.expenses, action) => {
   
  switch(action.type) {
    case 'ADD':
      return [
        ...state,
        action.options
      ];
    case 'EDIT':
      return {
        counts: state.counts - action.decreaseBy,
      };
    case 'REMOVE':
      return {
        counts: state.counts - action.decreaseBy,
      };
    case 'GET':
      return {
        counts: state.counts - action.decreaseBy,
      };
    default:
      return state;
  }
};

const filtersReducer = (state = defaultState.filters, action) => {
  switch(action.type) {
    case 'START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    case 'SORTBY':
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case 'TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

const store = redux.createStore(
redux.combineReducers({ 
  expenses: expensesReducer,
  filters: filtersReducer,
}), {}, 
//redux.applyMiddleware(reduxThunk())
);

let counter = 0;
const getVisibleExpenses = (expenses, filters) => {
  const {startDate, endDate, sortBy, text} = filters;
  
  return expenses.filter(expense => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text);
    return startDateMatch && endDateMatch && textMatch;
  })
  .sort((a, b) => {
    if(sortBy === 'date') {
      return -a.createdAt + b.createdAt; // descending // newest to oldest
    }
    else if (sortBy === 'amount') {
      return b.amount - a.amount; // descending
    }
  });
}
const unsubscribe = store.subscribe(() => {
  const {expenses, filters} = store.getState();
  const visibleExpenses = getVisibleExpenses(expenses, filters);
 debug(visibleExpenses, 'state counter:', ++counter);
});

// action creators
const addAction = (options = {}) => {
  const {
    id = uuid(),
    note = 'default note',
    description = 'default description', 
    amount = 0,
    createdAt = 0
  } = options;
  return {type: 'ADD', options: {
    id, note, description, amount, createdAt
  }};
}

const setStartDate = (startDate) => ({type: 'START_DATE', startDate});
const setEndDate = (endDate) => ({type: 'END_DATE', endDate});
const setSortBy = (sortBy = 'date') => ({
  type: 'SORTBY',
  sortBy,
});
const setText = (text = '') => ({type: 'TEXT_FILTER', text: text.toLowerCase()});

store.dispatch(addAction({amount: 4567}));
store.dispatch(addAction({amount: 17, description: 'buy some cheese balls'}));
store.dispatch(setStartDate(56));
store.dispatch(setEndDate(12566));
store.dispatch(setSortBy('amount'));
store.dispatch(setText('desC'))
store.dispatch(setSortBy());

