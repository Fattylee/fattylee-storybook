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

$('body').addClass('react-body'); //color: 'white'


ReactDOM.render(<Provider store={store} >
<App />
</Provider>, $('#rootZ')[0]);