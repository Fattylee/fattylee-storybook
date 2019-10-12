import React, { Fragment, Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import visibleExpenses from '../selectors/expenses';

import ExpenseListFilters from './ExpenseListFilters';
import ExpenseListItem from './ExpenseListItem';
import NoExpenses from './NoExpenses';
import {setPathname} from '../actions/pathnameAction';
import {setTextFilter } from '../actions/filtersAction';
import ActionButton from './ActionButton';


class ExpensesList extends Component { 
  
  componentDidMount() {
    this.props.dispatch(setPathname('/react'));
  }
  componentWillUnmount() {
    this.props.dispatch(setPathname());
    this.props.dispatch(setTextFilter());
  }
  render() { 
  const {expenses, dispatch, filters, IS_DESKTOP} = this.props;
      
  const expensesList = expenses.length ? expenses.map((expense, index) => (
  
    <ExpenseListItem />
  )) : <NoExpenses />; {/* expensesList */}
         
         
  const expensesListSketch = expenses.length ? expenses.map(expense => (
  
 <ExpenseListItem key={expense.id} dispatch={dispatch} IS_DESKTOP={IS_DESKTOP} {...expense} />
  )) : <NoExpenses />; {/* expensesListSketch */}
  
  return (
<Fragment>
     
     <ExpenseListFilters filters={filters} expenses={expenses} dispatch={dispatch}
     />
     <ActionButton />
     
     <h1 className='text-white my-4 text-center' >Expenses List</h1>
     
      <div  className="row mb-4">
       
       {expensesListSketch}
    
  </div>{/*}<!-- End row  -->*/}
{/*}</div>{/*}<!-- End container -->*/}

</Fragment>
);
};
};

const mstp = (state) => {
  return {
    expenses: visibleExpenses( state.expenses, state.filters),
    filters: state.filters,
    IS_DESKTOP: state.IS_DESKTOP,
  };
}

ExpensesList.propTypes = {
  expenses: PropTypes.array.isRequired,
}
export default connect(mstp)(ExpensesList);