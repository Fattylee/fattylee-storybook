import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {removeExpense} from '../actions/expensesAction';


const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => {
  return (
  
   <div key={id} className='col-sm-6'>
  <div >
    <Link to={'/react/expenses/' + id} className='no-anchor'>
    <h3>{description}</h3>
    <p>Amount: {amount} - createdAt: {createdAt}</p>
    </Link>
    <button className='btn btn-sm btn-danger'
    onClick={() =>dispatch(removeExpense(id))}
    >Remove</button>
    
     <Link to={'/react/expenses/edit/' + id} className='btn btn-sm btn-secondary ml-2'
    ><span className='fas fa-edit'></span> Edit</Link>
  </div>
  <hr  className='text-white'/>
 </div>
 
  );
}

export default ExpenseListItem;