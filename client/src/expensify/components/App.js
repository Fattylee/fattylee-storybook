import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';

import ExpensesList from './ExpensesList';
import Dashboard from './Dashboard';
import ExpenseForm from './ExpenseForm';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import Expense from './Expense';
import Loading from './Loading';



//console.log(require('react-router-dom'));
import Header from './Header';


const About = () => (
  <h4>About || This is the main Header</h4>
);

const News = (props) => {
  
return (
   <h5>News || Some text may go here, thanks </h5>
);
};

const NotFound = () => (
   <h5>404 || Some text may go here, thanks </h5>
);



const Hoc = (WrappedComp) => {
  return (props) => (
    <div>
    {props.isAdmin && <h1>I am admin</h1>}
    <p>Hoc comp</p>
    <WrappedComp {...props} />
    </div>
  );
}

const Alias = Hoc(NotFound);
//const ListHoc = Hoc(List);

const App = () => {
  return(
  <Router>
  <Header />
 
  <div className='container mt-4 text-white'>
  <Switch>
  
    <Route exact path='/react' component={Dashboard} />
    <Route exact path='/react/expenses' component={ExpensesList} />
    <Route  path='/react/expenses/add' component={AddExpense} />
    <Route  path='/react/expenses/edit/:id' component={EditExpense} />
    <Route exact path='/react/expenses/:id' component={Expense} />
    <Route  path='/react/about' component={About} />
    <Route  path='/react/news' component={News} />
    <Route  path='/react/loading' component={Loading} />
    
    <Route component={NotFound} />
    <News /> {/* never will it get here */}
  </Switch>
  </div>
  </Router>
);
};

export default App;

