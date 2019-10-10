import React from 'react';
import {Link} from 'react-router-dom';


const ActionButton = () => (
 
    <Link to="/react/expenses/add"
      className="action-btn-no-border btn btn-lg btn-black  text-white"
    >
      <i className="fas fa-plus"></i>
   </Link>
);

export default ActionButton;