import React, {Fragment, Component } from 'react';
import {addExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {setLoading} from '../actions/isLoadingAction';


class AddExpense extends Component {
  
  onSubmit = (expense) => {
    
    this.props.setLoading(true);
    this.props.addExpense(expense);
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


export default connect(null ,{ addExpense, setLoading })(AddExpense);