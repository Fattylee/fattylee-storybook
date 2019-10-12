import React, {Fragment, Component } from 'react';
import {Link} from 'react-router-dom';
import {removeExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import capitalizeSentence from '../helpers/capitalizeSentence';


class Expense extends Component {
   
  componentDidMount(prevState, prevProp) {
    console.log(prevState, prevProp);
    axios.get('/api/v1/stories')
    .then(res => {
      //console.log('res', res);
    })
    .catch(err => {
      //console.log('err', err);
    })
  }
  
  render() {
    const {expense, dispatch} = this.props;
    let expenseView ;
    if (expense) {
    const {id, note, description, createdAt, amount} = expense;
    expenseView = ( 
    <div className='text-center'>
  
  <div>
    <h3 className='my-4 h2'>{capitalizeSentence(description)}</h3>
    <p>Amount: {amount}</p>
   
    <p>Note: {note}</p>
    <p>Date: {moment(createdAt).format()}</p>
    <button className='btn btn-sm btn-danger'
    onClick={() => {
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
      expenseView = <h1>Not found</h1>;
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
