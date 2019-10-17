import React, {Fragment, Component } from 'react';
import {Link} from 'react-router-dom';
import {removeExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import capitalizeSentence from '../helpers/capitalizeSentence';
import {setLoading} from '../actions/isLoadingAction';


class Expense extends Component {
   
  render() {
    const {expense, dispatch} = this.props;
    let expenseView ;
    if (expense) {
    const {id, note, description, createdAt, amount} = expense; 
    expenseView = ( 
    <div className='text-center'>
  
  <div>
    <h3 className='my-4 h2'>{capitalizeSentence(description)}</h3>
    <p>Amount: ₦{amount.toFixed(2)}</p>
   
    <p>Note: { note || 'No note'}</p>
    <p>Date: {moment(createdAt).format('MMM Do, YYYY')}</p>
    <button className='btn btn-sm btn-danger'
    onClick={() => {
      dispatch(setLoading(true));
      dispatch(removeExpense(id));
    this.props.history.push('/react/expenses');
    }}
    >Remove</button>
    
     <Link to={'/react/expenses/edit/' + id} className='btn btn-sm btn-secondary ml-2'
    ><span className='fas fa-edit'></span> Edit</Link>
  </div>
  <hr  className='text-white'/>
 </div>)
    }
    else {
      expenseView = <h3 className='text-center'>Expense not found. Goto 
      <Link to="/react/expenses"  className="btn bg-black text-white ml-2"> <span  className="fas fa-database"></span> Expenses</Link>
      </h3>;
    }
    return (
    <Fragment>
     {expenseView}
    </Fragment>
  );
  }
  
}
  
const mstp = (prevState, prevProp) => {
  return {
    expense: prevState.expenses.find(({id}) => id === prevProp.match.params.id),
  }
}

export default connect(mstp)(Expense);