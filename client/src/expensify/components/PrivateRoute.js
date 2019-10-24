import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export const PrivateRoute = ({
  fake,
  component,
  path,
  state,
  ...rest
}) => (
   <Fragment>
   {
     true ? 
     <Fragment>
       <Route component={component} /> 
     </Fragment> : <Redirect to='/react' />
   }
  </Fragment>
);

export default connect(state => ({state}))(PrivateRoute);
