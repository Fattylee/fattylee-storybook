import React, {Fragment} from 'react';
import {setTextFilter, sortByDate, sortByAmount} from '../actions/filtersAction';


const ExpenseListFilters = ({dispatch, filters, expenses}) => (
 <Fragment>
   <div className='searchBox-container move-to-navbar-bottom'>
       <input type="text" placeholder="Search expenses by description" className="search-box"
       value={filters.text}
      onChange={(e)=>dispatch(setTextFilter(e.target.value))}
       />
       <span className='close-search-box fas fa-times  fa-1x text-center pt-3' title='close search box'
       onClick={() => dispatch(setTextFilter()) }
       ></span>
       <span className='match-count'>{expenses.length}</span>
     </div>
     {/* end searchBox-container*/}
     
     <div className="form-group text-white" style={{marginTop: '67px'}}>
     <label htmlFor="status">Sort by</label>
<select className="form-control" id="status" name="status"
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
  </div>
  {/* end Sortby selector*/}
 </Fragment>
);

export default ExpenseListFilters;

