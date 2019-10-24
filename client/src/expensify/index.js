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
  
store.subscribe(() => console.log('abu', store.getState()));


// this code will run only once
store.dispatch(getCurrentUser())
.then(currentUser => { 
  // render App
  render();
})
.catch(err => { 
  render();
});


//const run = () => {

      setTimeout(() => {
        try {
        throw ({message:'Network issue, please try again later.'});
      }
    
    catch(e) {
      console.log('qz ', e.message); 
    
      if( e.message && e.message.toLowerCase().includes('network issue')) {
        return console.log('y ', e); 
 
      }
      
      console.log('z Something went wrong, pls try again', e.message); 
    }
  }, 1000); // end setTimeout
//};run();