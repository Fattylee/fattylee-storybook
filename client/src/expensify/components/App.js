import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import ExpensesList from './ExpensesList';
import Dashboard from './Dashboard';
import ExpenseForm from './ExpenseForm';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import Expense from './Expense';
import RandomizeLoader from './RandomizeLoader';
import Login from './Login';
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

const App = (props) => {
  //console.log(props.state);
  return(
  <Router>
  <Header />
  
  <div className='container mt-4 text-white'>
  <Switch>
  
    <Route exact path='/react' component={Dashboard} />
    <Route  path='/react/about' component={About} />
    <Route  path='/react/news' component={News} /> 
    
    <Fragment>
    {!props.state.authUser ? <Login notNav /> : props.state.isLoading ? 'isLoading' : (
    <Switch>
    <Route exact path='/react/expenses' component={ExpensesList} />
    <Route  path='/react/expenses/add' component={AddExpense} />
    <Route  path='/react/expenses/edit/:id' component={EditExpense} />
    <Route exact path='/react/expenses/:id' component={Expense} />
   
    <Route path='/react/loading'
    render={(props) => <RandomizeLoader  {...props}/>} />
    <Route component={NotFound} />
    </Switch>
    )}
    </Fragment>
 
  </Switch>
  </div>
  
  </Router>
);
};

export default connect(state => ({state}))(App);
