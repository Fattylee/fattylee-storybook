import React from 'react';
import ReactDOM from 'react-dom';
import redux, { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import $ from 'jquery';

import App from './components/App';
import reducers from './reducers';
import * as actions from './actions/expensesAction';
import * as actionFilter from './actions/filtersAction';

const store = createStore(reducers);

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log('state', state);
});


const payload = store.dispatch(actions.addExpense({id: Math.random(), name: 'lulu ibn rakhaab', age: 71, isMarried: true, note:'abu lulu'}));

//store.dispatch(actionFilter.setTextFilter('rent'))

store.dispatch(actionFilter.sortByAmount())
store.dispatch(actionFilter.sortByDate())
//store.dispatch(actionFilter.setStartDate())

//setTimeout(() => {

//store.dispatch(actionFilter.setTextFilter('onE'));

//store.dispatch(actionFilter.setStartDate(0));
//store.dispatch(actionFilter.setEndDate(Date.now() -1000));
//}, 500);


function getVisibleExpenses(expenses, filters) {
  return expenses
    .filter(expense => {
    const startDateMatch = typeof filters.startDate === 'undefined' || expense.createdAt >= filters.startDate;
    const endDateMatch = typeof filters.endDate === 'undefined' || expense.createdAt <= filters.endDate;
    const textMatch = expense.description.toLowerCase().includes(filters.text.toLowerCase());
    
    return startDateMatch && endDateMatch && textMatch;
  })
  .sort((a,b) => {
    if(filters.sortBy === 'date'){
      return b.createdAt - a.createdAt
    }
    else {
      return b.amount - a.amount;
    }
  }); 
}
const { expenses, filters} = store.getState()

console.log('visibleExpenses', getVisibleExpenses(expenses, filters))

ReactDOM.render(<Provider store={store} >
<App />
</Provider>, $('#rootZ')[0]);