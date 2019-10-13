import React, {Fragment, Component } from 'react';
import {startAddExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';


class AddExpense extends Component {
  
  onSubmit = (expense) => {
    
    //this.props.dispatch(addExpense(expense));
    this.props.startAddExpense(expense);
    this.props.history.push('/react/expenses');
    
  }; // end onSubmit
  
  
  
  render() {
    
    return (
    <Fragment>
      <ExpenseForm onSubmitExpense={this.onSubmit} />
      
    </Fragment>
  );
  }
}


export default connect(null,{ startAddExpense })(AddExpense);