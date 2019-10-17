import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => (
  <Fragment>
  <h1 className='mb-4'>Expensify yourself made easy</h1>
  <p>Expensify was built to make receipt tracking and expense management a breeze for anyone. You can use Expensify to track receipts for personal or business use, submit expenses to your company, or collect expense reports from colleagues. 
  <Link to="/react/expenses"  className="btn bg-black text-white ml-2"> <span  className="fas fa-database"></span> Expenses</Link>
  </p>
  </Fragment>
);

export default Dashboard;