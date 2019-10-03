import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';

console.log(require('react-router-dom'));
import Header from './Header';

const Home = () => (
  <h1>Home || This is the main Header</h1>
);
const About = () => (
  <h4>About || This is the main Header</h4>
);

const News = () => (
   <h5>News || Some text may go here, thanks </h5>
);
const NotFound = () => (
   <h5>404 || Some text may go here, thanks </h5>
);


const App = () => (
  <Router>
  <Header />
  <div className='container mt-4'>
  <Switch>
  
    <Route exact path='/react' component={Home} />
    <Route  path='/react/about' component={About} />
    <Route  path='/react/news' component={News} />
    <Route component={NotFound} />
    <News /> {/* never will it get here */}
  </Switch>
  </div>
  </Router>

);


export default App;
