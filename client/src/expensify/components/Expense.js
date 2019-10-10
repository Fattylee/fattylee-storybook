import React, {Fragment, Component } from 'react';
import axios from 'axios';


class Expense extends Component {
  
  componentDidMount(prevState, prevProp) {
    console.log(prevState, prevProp);
    axios.get('/api/v1/stories')
    .then(res => {
      console.log('res', res);
    })
    .catch(err => {
      console.log('err', err);
    })
  }
  render() {
    
    return (
    <Fragment>
     <h1 className='bg-info text-white'> Expense Details</h1>
    </Fragment>
  );
  }
  
}


export default Expense;
