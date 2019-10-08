import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import $ from 'jquery';
import getVisibleExpenses from './selectors/expenses';
import App from './components/App';

import * as actions from './actions/expensesAction';
import * as actionFilter from './actions/filtersAction';
import configureStore from './store/configureStore';


const store = configureStore();

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
 // console.log('state', state);
});


//const payload = store.dispatch(actions.addExpense({id: Math.random(), name: 'lulu ibn rakhaab', age: 71, isMarried: true, note:'abu lulu'}));

//store.dispatch(actionFilter.setTextFilter('rent'))

//store.dispatch(actionFilter.sortByAmount())
//store.dispatch(actionFilter.sortByDate())
//store.dispatch(actionFilter.setStartDate())

//setTimeout(() => {

store.dispatch(actionFilter.setTextFilter('E'));

//store.dispatch(actionFilter.setStartDate(0));
//store.dispatch(actionFilter.setEndDate(Date.now() -1000));
//}, 500);



const { expenses, filters} = store.getState()

//console.log('visibleExpenses', getVisibleExpenses(expenses, filters));

$('body').css({background: 'rgba(0,0,0,0.8)', //color: 'white'
});

ReactDOM.render(<Provider store={store} >
<App />
</Provider>, $('#rootZ')[0]);