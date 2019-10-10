import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => (
  <Fragment>
  <h1>Home || This is the main Header 
  <Link to="/react/expenses"  className="btn bg-black text-white"><span  className="fas fa-database"></span> Expenses</Link>
  </h1>
  </Fragment>
);

export default Dashboard;

