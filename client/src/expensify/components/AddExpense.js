import React, {Fragment, Component } from 'react';
import axios from 'axios';


class AddExpense extends Component {
  state = {
    description: '',
    text: '',
    amount: '',
    createdAt: undefined,
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  }
  
  onChangeDescription = (e) => {
      const value = e.target.value; 
      this.setState((prevState) => ({
        description: value,
      }));
    }
  componentDidMount(prevState, prevProp) {
    // console.log(prevState, prevProp);
   
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
    
   
  
  <h3 className="text-center mt-4" id="story-title">Add your next story</h3>
  <div className="text-center">
    <img  className="img-fluid mb-4 rounded" id="story-img"/>
    </div>
  <div className="row">
    <div className="col-sm-8 mx-auto mb-4">
     
<form method="post" action="/stories" id="story" data-name="add" onSubmit={this.onSubmit}>
   
  
   <input type="hidden" name="storyImage" value=""
   onChange={() => {}}/>

  
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" name="description" 
    value={this.state.description} className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" autoFocus maxLength="100" minLength="5" required 
    onChange={ this.onChangeDescription }
    />
  </div> {/*{!-- End title --}*/}
  
  <div className="form-group">
    <label htmlFor="details">Details</label>
    <textarea name="details" type="password" className="form-control details-height" id="details" placeholder="Enter details"  minLength="100" required={true}
    
    >{/*{story.details}*/}</textarea>
  </div> {/*{!-- End details --}*/}
  
   <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">Upload</span>
    </div>
    <div className="custom-file">
    <input type="file" className="custom-file-input" id="file" accept="image/*"  required={true} />
    <label className="custom-file-label" htmlFor="file">Choose a story image</label>
    </div>
  </div> {/*{!-- End File upload --}*/}
  
   <div className="form-check">
        <label htmlFor="allowComments" className="form-check-label">
        <input name="allowComments" type="checkbox" className="form-check-input" id="allowComments" checked
        onChange={() => {}}
         />
            Allow Comments
        </label>
    </div>
  <div className="form-group">
     <label htmlFor="status">Status</label>
<select className="form-control" id="status" name="status"
onChange={() => {}}
>
    <option value="public">Public</option>
    <option value="private">Private</option>
  </select>
  </div>
   <button type="submit" className="btn btn-block btn-primary" data-name='add'>Add story </button>
      
</form>
</div>
</div>

    </Fragment>
  );
  }
  
}


export default AddExpense;

