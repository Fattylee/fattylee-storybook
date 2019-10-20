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
import './auth/auth';


const store = configureStore();

$('body').addClass('react-body');

// page animation
ReactDOM.render(<RandomizeLoader />, $('#rootZ')[0]);

/*ReactDOM.render(<Provider store={store} >
  <App />
  </Provider>, $('#rootZ')[0]);
  */
  
store.subscribe(() => console.log(store.getState()));

store.dispatch(getCurrentUser())
.then(currentUser => {
  console.log('signed in', currentUser);
  // render App
  ReactDOM.render(<Provider store={store} >
  <App />
  </Provider>, $('#rootZ')[0]);
  
})
.catch(err => {
  console.log(err);
  
  ReactDOM.render(<Provider store={store} >
  <App />
  </Provider>, $('#rootZ')[0]);
 
});
