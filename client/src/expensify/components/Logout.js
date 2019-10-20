import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../auth/auth';

const Logout = () => (
   <Fragment>
   <a className="nav-link"
   onClick={() => {
     logout()
     .then(function() {
    console.log('Sign-out successful.');
}).catch(function(error) {
  // An error happened.
console.log('An error happened.', error);
});
   }}
   >
   <i className='fas fa-sign-out-alt'
   //fas fa-sign-out-alt
   //fas fa-user-lock
   ></i>  Logout
   </a> 
  </Fragment>
);

export default Logout;