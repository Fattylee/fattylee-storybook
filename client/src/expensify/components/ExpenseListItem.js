import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {removeExpense} from '../actions/expensesAction';
import capitalizeSentence from '../helpers/capitalizeSentence';
import truncateText from '../helpers/truncateText';
import moment from 'moment';


const ExpenseListItem = ({id, description, amount, createdAt, dispatch, IS_DESKTOP}) => {
  const descriptionText = IS_DESKTOP ?truncateText(description, 17) : capitalizeSentence(description);
  
  const amountAndDate = IS_DESKTOP ?truncateText(`Amount: ${amount} - created ${moment(createdAt).fromNow()}`, 39) : capitalizeSentence(`Amount: ${amount} - created ${moment(createdAt).fromNow()}`);
  
  return (
  
   <div key={id} className='col-sm-6'>
  <div >
    <Link to={'/react/expenses/' + id} className='no-anchor'>
    <h3>{descriptionText} <span className='fas fa-folder-open ml-4'></span></h3> 
    <p>{amountAndDate}</p>
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