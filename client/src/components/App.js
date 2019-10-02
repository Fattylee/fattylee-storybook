import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom';

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
  <BrowserRouter>
  <Header />
  <Switch>

    <Route exact path='/react' component={Home} />
    <Route  path='/react/about' component={About} />
    <Route  path='/react/news' component={News} />
    <Route component={NotFound} />
    
  </Switch>
  </BrowserRouter>

);

ReactDOM.render(<App />, $('#rootZ')[0]);


export default App;

