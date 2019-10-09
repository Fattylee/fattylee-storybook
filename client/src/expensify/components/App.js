import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';


import Dashboard from './ExpensesList';
import ExpenseForm from './ExpenseForm';
import AddExpense from './AddExpense';


//console.log(require('react-router-dom'));
import Header from './Header';

const Home = () => (
  <h1>Home || This is the main Header</h1>
);
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
  {/* <Alias isAdmin={true}/> */}
  <div className='container mt-4 text-white'>
  <Switch>
  
    <Route exact path='/react' component={Dashboard} />
    <Route  path='/react/add' component={AddExpense} />
    <Route  path='/react/about' component={About} />
    <Route  path='/react/news' component={News} />
    <Route component={NotFound} />
    <News /> {/* never will it get here */}
  </Switch>
  </div>
  </Router>
);
};

export default App;

