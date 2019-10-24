import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Login from './Login';
import Logout from './Logout'


const Dashboard = () => (
  <Fragment>
  <h1 className='mb-4'>Expensify yourself made easy</h1>
  <p>Expensify was built to make receipt tracking and expense management a breeze for anyone. You can use Expensify to track receipts for personal or business use, submit expenses to your company, or collect expense reports from colleagues. 
  </p>
  <p>
  <Login notNav /> to get started.
  </p>
  <Link to='/react/about'>About</Link>
  </Fragment>
);

export default Dashboard;
