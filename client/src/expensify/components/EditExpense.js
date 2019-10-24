import React, {Fragment, Component } from 'react';
import {editExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {setLoading} from '../actions/isLoadingAction';
import {setGlobalError} from '../actions/errorAction';

class EditExpense extends Component {
  
  onSubmit = async (expense) => {
  
    const {id} = this.props.match.params;
     const {uid:owner} =  this.props.state.authUser;
    expense.owner = owner;
    try {
      this.props.dispatch(setLoading(true));
      this.props.history.push('/react/expenses');
      setTimeout(() => {
        throw Error('Network issue, please try again later.');
      }, 10000);
    await this.props.dispatch(editExpense(id, expense));
    this.props.dispatch(setLoading());
    
    }
    catch(e) {
      console.log('Something went wrong, pls try again', e.message); 
      this.props.dispatch(setLoading());
      if(e.message && e.message.toLowerCase().includes('Network issue')) {
        return this.props.dispatch(setGlobalError({message: e.message, duration: 86400000}));
      }
      this.props.dispatch(setGlobalError({message: 'permission denied, could not edit expense, please try again later', duration: 86400000}));
      
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
