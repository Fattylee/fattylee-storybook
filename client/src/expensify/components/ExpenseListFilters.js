import React, {Fragment} from 'react';
import $ from 'jquery';
import {setTextFilter, sortByDate, sortByAmount} from '../actions/filtersAction';


const ExpenseListFilters = ({dispatch, filters, expenses}) => (
 <div className='expense-list-filters'>
   <div className='searchBox-container move-to-navbar-bottom'>
       <input type="text" placeholder="Search expenses by description" className="search-box"
       value={filters.text}
      onChange={(e)=>dispatch(setTextFilter(e.target.value))}
       />
       <span className='close-search-box fas fa-times  fa-1x text-center pt-3' title='close search box'
       onClick={() => {
         dispatch(setTextFilter());
          $('.expense-list-filters').fadeOut('slow');
       }}
       ></span>
       <span className='match-count'>{expenses.length}</span>
     </div>
     {/* end searchBox-container*/}
     
  
<div className="input-group sortby mb-3" > 
    <div className="input-group-prepend"> 
      <span className="input-group-text">
        <span>Sort by</span>
      </span> 
    </div> 
    <select className="form-control" id="sortby" name="sortby"
onChange={(e) => {
  const value = e.target.value;
  if(value === 'amount'){
    dispatch(sortByAmount());
  }
  else {dispatch(sortByDate())}
}}
>
    <option value="date">Date</option>
    <option value="amount">Amount</option>
  </select>
  </div>  {/* end Sortby selector*/}
 </div>
);
export default ExpenseListFilters;