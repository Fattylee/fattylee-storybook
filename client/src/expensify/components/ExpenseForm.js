import React, {Fragment, Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import AlertBox from './AlertBox';


class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    focused: false,
    errors: [],
    screen: window.innerWidth,
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState(prevState => ({errors: []}));
    
    const description = this.state.description.trim();
    const amount = this.state.amount.trim();
    
    if(!description) {
      this.setState(prevState => ({ errors: [...prevState.errors, 'Please provide a value for the description field'], description: ''}));
      
    }
    
    if(!amount) {
      this.setState(prevState => ({ errors: [...prevState.errors, 'Please provide a value for the amount field'], amount: ''}));
      
    }
    if(description && amount) {
    
    const state = {
      description,
      amount: parseFloat(this.state.amount, 10) * 100,
      createdAt: this.state.createdAt.valueOf(),
      note: this.state.note.trim(),
      };
      this.props.onSubmitAdd(state);
   
    }
  }; // end onSubmit
  
  onChangeDescription = (e) => {
    this.setState(prevState => ({errors: []}));
      const description = e.target.value; 
      this.setState((prevState) => ({
        description,
      }));
  }; // end onChangeDescription
  onChangeNote = (e) => {
    this.setState(prevState => ({errors: []}));
    const note = e.target.value;
    this.setState(prevState => ({note}));
  }
  onChangeAmount = (e) => {
    this.setState(prevState => ({errors: []}));
    const amount = e.target.value;
    
    if(amount.match(/^(|\d+\.?(\d{1,2})?)$/ig)) {
      this.setState((prevState) => ({
        amount,
      }));
    }
    
  }
  
  render() {
    const wrapper = "col-sm-8 mx-auto mb-4 bg-transparent card-body border-color-white ";
    return (
    <Fragment>
   
  { !!this.state.errors.length &&  this.state.errors.map((msg,i) => (
  <AlertBox  
    key={i}             
    message={msg}
    duration={10000}
   />))}
 
  
  
  <div className="row">
  
    <div className={this.state.screen >= 440 ? wrapper + 'card mt-4' : wrapper }
    >
     <div className="text-center">
  <span className='fa fa-database fa-5x'></span>
     <h3 className="mt-4">Add expense</h3>
  </div>
<form onSubmit={this.onSubmit}>
      
  
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" name="description" 
    value={this.state.description} className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" autoFocus maxLength="100" minLength="3" 
    required 
    onChange={ this.onChangeDescription }
    />
  </div> {/*{!-- End Description --}*/}
  
  <div className="form-group">
    <label htmlFor="amount">Amount</label>
    <input 
    type="text" 
    name="amount" 
    value={this.state.amount} className="form-control" id="amount"  placeholder="Enter amount" 
    required 
    onChange={ this.onChangeAmount }
    />
  </div> {/*{!-- End Amount --}*/}
  
   <div className="form-group">
    <label htmlFor="datepicker"
     style={{display: 'block'}}>Pick a date</label>
     <SingleDatePicker 
     id='datepicker'
     //className="form-control"
    date={this.state.createdAt} // momentPropTypes.momentObj or null
    onDateChange={createdAt => {
      if(createdAt) {
        this.setState({ createdAt })}
      }
    }  // PropTypes.func.isRequired
    focused={this.state.focused} // PropTypes.bool 
    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
    id="your_unique_id" // PropTypes.string.isRequired,
    numberOfMonths={1}
    isOutsideRange={() => false}
    
     />
  </div> {/*{!-- End Date --}*/}
  
  <div className="form-group">
    <label htmlFor="note">Note</label>
    <textarea name="note"  className="form-control details-height" id="note" placeholder="Enter note (optional)"  
    onChange={this.onChangeNote}
    value={this.state.note}
    ></textarea>
  </div> {/*{!-- End note --}*/}
 
   <button type="submit" className="btn btn-block btn-lg  btn-black" data-name='add'>Add expense </button>
      
</form>
</div>
</div>

    </Fragment>
  );
  }
}


export default ExpenseForm;
