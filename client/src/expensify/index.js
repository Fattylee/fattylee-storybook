import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import $ from 'jquery';
import getVisibleExpenses from './selectors/expenses';
import App from './components/App';
import * as actions from './actions/expensesAction';
import * as actionFilter from './actions/filtersAction';
import configureStore from './store/configureStore';
import RandomizeLoader from './components/RandomizeLoader';
import {getInit} from './actions/expensesAction';
import {getCurrentUser} from './actions/authAction';


const store = configureStore();

$('body').addClass('react-body');

const render = () => {
  ReactDOM.render(<Provider store={store} >
  <App />
  </Provider>, $('#rootZ')[0]);
}

// page bootstrap animation
ReactDOM.render(<RandomizeLoader />, $('#rootZ')[0]);
  
//store.subscribe(() => console.log('abu', store.getState()));

// this code will run only once
store.dispatch(getCurrentUser())
.then(currentUser => { 
  // render App
  render();
})
.catch(err => { 
  render();
});
