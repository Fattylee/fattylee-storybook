import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export const PrivateRoute = ({
  fake,
  component,
  path,
  state: {authUser},
  ...rest
}) => (
   <Fragment>
   {
     !authUser ? 
     <Fragment> 
       <Route component={component} /> 
     </Fragment> : <Redirect to='/react/expenses' />
   }
  </Fragment>
);

export default connect(state => ({state}))(PrivateRoute);
