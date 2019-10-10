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
  const {expenses, dispatch, filters} = this.props;
      
  const expensesList = expenses.length ? expenses.map((expense, index) => (
  
    <ExpenseListItem />
  )) : <NoExpenses />; {/* expensesList */}
         
         
  const expensesListSketch = expenses.length ? expenses.map(expense => (
  
 <ExpenseListItem key={expense.id} dispatch={dispatch} {...expense} />
  )) : <NoExpenses />; {/* expensesListSketch */}
  
  return (
<Fragment>
     
     <ExpenseListFilters filters={filters} expenses={expenses} dispatch={dispatch}
     />
     <ActionButton />
     
     <h1 className='text-white my-4 text-center' >Expenses List</h1>
     
      <div  className="row">
       
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
  };
}

ExpensesList.propTypes = {
  expenses: PropTypes.array.isRequired,
}
export default connect(mstp)(ExpensesList);

