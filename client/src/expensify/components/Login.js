import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {login} from '../auth/auth';

const Login = ({notNav}) => (
   <Fragment>
   <a className={notNav ? "btn btn-lg btn-dark bg-black" : 'nav-link'}
   onClick={() => {
     login()
     .then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
//console.log(token, user, 'success');
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
//console.log(errorCode, errorMessage, email, credential, 'error');
});
   }}
   >
    <i className='fas fa-user-lock' 
   ></i>   Login with Google
   </a>
  
  </Fragment>
);

export default Login;