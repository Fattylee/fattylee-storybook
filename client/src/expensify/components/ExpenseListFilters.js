import React, {Fragment, Component} from 'react';
import $ from 'jquery';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filtersAction';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';


class ExpenseListFilters extends Component { 
  state = {
    focusedInput: null,
  }
  
  render() {
    const {dispatch, filters, expenses} = this.props;
    return (
 <div className='expense-list-filters'>
   <div className='searchBox-container move-to-navbar-bottom'>
       <input type="text" placeholder="Search expenses by description" className="search-box"
       autoFocus={true}
       
       value={filters.text}
      onChange={(e)=>dispatch(setTextFilter(e.target.value))}
       />
       <span className='close-search-box fas fa-times  fa-1x text-center pt-3' title='close search box'
       onClick={() => {
         const startDate = moment(0).startOf('day'), endDate = moment().endOf('year');
         dispatch(setTextFilter());
         dispatch(setStartDate(startDate));
         dispatch(setEndDate(endDate));
         this.setState({startDate, endDate});
          $('.expense-list-filters').fadeOut('slow');
       }}
       ></span>
       <span className='match-count'>{expenses.length}</span>
     </div>
     {/* end searchBox-container*/}
     
  
<div className="input-group sortby sortby-mt mb-3" > 
    <div className="input-group-prepend"> 
      <span className="input-group-text bg-black text-white">
        <span>Sort by</span>
      </span> 
    </div> 
    <select className="form-control" id="sortby" name="sortby"
    value={filters.sortBy}
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
  
  <div className="input-group sortby" > 
    <div className="input-group-prepend"> 
      <span className="input-group-text bg-black text-white">
        <span>Range</span>
      </span> 
    </div> 
  <DateRangePicker
  startDate={filters.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={filters.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => { 
  console.log('=onDatesChange', startDate, endDate);
  dispatch(setStartDate(startDate));
  dispatch(setEndDate(endDate));
  /*this.setState({ startDate, endDate }, () => {
    console.log(this.state);
  });*/
  
  
  }} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
  numberOfMonths={1}
  showClearDates
  isOutsideRange={()=> false}
  
  />
  </div> {/* End DateRangePicker */}
 </div>
);
}
}

export default ExpenseListFilters;