import React, {Fragment, Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {addExpense} from '../actions/expensesAction';
import {connect} from 'react-redux';
//import alertBox from '../../helpers/alertBox';
import AlertBox from './AlertBox';


class AddExpense extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    focused: false,
    errors: [],
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState(prevState => ({errors: []}));
    const {description, amount} = this.state;
    console.log('form', this.state);
    
    if(!description) {
      this.setState(prevState => ({ errors: [...prevState.errors, 'Please provide a value for the description field']}));
      console.log('description', this.state);
    }
    
    if(!amount) {
      this.setState(prevState => ({ errors: [...prevState.errors, 'Please provide a value for the amount field']}));
      console.log('amount', this.state);
    }
    else {
    console.log('else', this.state);
    const result = {
      ...this.state,
      amount: parseFloat(this.state.amount, 10),
      createdAt: this.state.createdAt.milliseconds(),
      };
    console.log(this.state, 'result', result);
    this.props.dispatch(addExpense(result));
    this.props.history.push('/react');
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
  componentDidMount(prevState, prevProp) {
    // console.log(prevState, prevProp);
   const now = moment(33);
   
   console.log(now, now.millisecond());
    axios.get('/api/v1/stories')
    .then(res => {
      //console.log('res', res);
    })
    .catch(err => {
     // console.log('err', err);
    })
  }
  
  render() {
    
    return (
    <Fragment>
    
   
  { !!this.state.errors.length &&  this.state.errors.map((msg,i) => (
  <AlertBox  
    key={i}             
    message={msg}
    duration={100000}
   />))}
  <h3 className="text-center mt-4" id="story-title">Add your next expense</h3>
  
 
  
  <div className="text-center">
    <img  className="img-fluid mb-4 rounded" id="story-img"/>
    </div>
  <div className="row">
  

    
    <div className="col-sm-8 mx-auto mb-4">
     
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
    >{this.state.note}</textarea>
  </div> {/*{!-- End note --}*/}
 
   <button type="submit" className="btn btn-block btn-lg  btn-black" data-name='add'>Add expense </button>
      
</form>
</div>
</div>

    </Fragment>
  );
  }
}


export default connect()(AddExpense);