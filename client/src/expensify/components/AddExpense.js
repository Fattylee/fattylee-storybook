import React, {Fragment, Component } from 'react';
import {addExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';


class AddExpense extends Component {
  
  onSubmit = (data) => {
    
    this.props.dispatch(addExpense(data));
    this.props.history.push('/react');
    
  }; // end onSubmit
  
  
  
  render() {
    return (
    <Fragment>
      <ExpenseForm onSubmitAdd={this.onSubmit}/>
    </Fragment>
  );
  }
}


export default connect()(AddExpense);