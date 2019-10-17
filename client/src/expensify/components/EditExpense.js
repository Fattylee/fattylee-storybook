import React, {Fragment, Component } from 'react';
import {editExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';


class EditExpense extends Component {
  
  onSubmit = async (expense) => {
  
    const {id} = this.props.match.params;
    try {
      this.props.history.push('/react/loading');
    await this.props.dispatch(editExpense(id, expense));
    this.props.history.push('/react/expenses');
    }
    catch(e) {
      console.log('Something went wrong, pls try again', e.message);
      //this.props.history.push('/react/expenses/edit/' + id );
      this.props.history.goBack();
    };
    
  }; // end onSubmit
  
  
  getExpense = () => {
   const expense = this.props.state.expenses.find(expense => expense.id == this.props.match.params.id );
   
   if(!expense) {
     this.props.history.push('/react/not-found');
     return;
   }
   return expense;
  }
  render() { 
  
    return (
    <Fragment>
      <ExpenseForm onSubmitExpense={this.onSubmit} expense={this.getExpense()} 
      title={'Edit expense'}
      />
      
    </Fragment>
  );
  }
}


export default connect(state => ({state}))(EditExpense);