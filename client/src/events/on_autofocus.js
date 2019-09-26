import $ from 'jquery';

import loading from '../helpers/loading';

export default () => {
// on submit login and register

const col = $('.forgot');
col.empty();
col.append($(`<div class="card card-body">
     <div class="text-center mb-2"><i class="fas fa-user-lock fa-5x"></i></div>
  <h3 class="text-center mb-4">Forgot password</h3>   
    
<form method="post" action="/users/forgot-password" class="submit" data-name="forgot-password">
  
<div class="input-group input-group-lg mb-3"> 
    <div class="input-group-prepend"> 
      <span class="input-group-text" id="email">@</span> 
    </div> 
    <input type="email" name="email" autofocus required="" minlength="5" class="form-control" placeholder="Enter email" aria-label="Email" aria-describedby="email"> 
  </div> 

  <button type="submit" class="btn btn-lg btn-block btn-primary">Submit</button>
  <input id='fs' />
</form> 

</div> <!-- end card -->`))
.find('#fs').focus();


}