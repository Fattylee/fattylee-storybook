import React, {Fragment, Component } from 'react';
import axios from 'axios';


class ExpenseForm extends Component {
  state = {
    description: '',
    text: '',
    amount: 0,
    createdAt: undefined,
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  }
  
  onChangeDescription = (e) => {
     // e.persist();
      
      const value = e.target.value;
      console.log(this, 'this', value);
      //return; 
      this.setState((prevState) => ({
        description: e.target.value,
      }));
    }
  componentDidMount(prevState, prevProp) {
    // console.log(prevState, prevProp);
   /*
    axios.get('/api/v1/stories')
    .then(res => {
      console.log('res', res);
    })
    .catch(err => {
      console.log('err', err);
    });
    */
  }
  
  render() {
    
    return (
    <Fragment>
    
   
  
  <h3 className="text-center mt-4" id="story-title">Add your next story</h3>
  <div className="text-center">
    <img  className="img-fluid mb-4 rounded" id="story-img"/>
    </div>
  <div className="row">
    <div className="col-sm-8 mx-auto mb-4">
     
<form method="post" onSubmit={this.onSubmit}>
   
  
   
  
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" name="description" 
    value={this.state.description} className="form-control"  placeholder="Enter description" autoFocus maxLength="100" minLength="5" required 
    onChange={ this.onChangeDescription }
    />
  </div> {/*{!-- End title --}*/}
  
 
   <button className="btn btn-block btn-primary">Add story </button>
      
</form>
</div>
</div>

    </Fragment>
  );
  }
  
}


export default ExpenseForm;

