import React, { Fragment, Component} from 'react';
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from 'jquery';
import Logout from './Logout';
import Login from './Login';
import {firebase} from '../firebase/firebase';

class Header extends Component {
  
  onClickCloseNavbar = () => {
 const btn = $('nav.navbar button'); 
 if(btn.attr('aria-expanded') === 'true') btn.click(); // close opened navbar
    }
  
  render () {
    
    return (
      <Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger shadow-dark-react">
<div className='container'>
  <NavLink className="navbar-brand" activeClassName='active-nav-link' exact to="/react"
  onClick={this.onClickCloseNavbar}
  >Expensify</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
    
    
    <ul className="navbar-nav ml-auto"
    onClick={this.onClickCloseNavbar}
    >
   {
     !this.props.authUser ?  <li className="nav-item">
        <Login />
    </li> : <Fragment>
    <li className="nav-item">
        <NavLink exact activeClassName='active-nav-link' className="nav-link" to="/react/expenses"><i className='fas fa-database'></i> Expenses</NavLink>
    </li>
    {
      this.props.pathname === '/react' && (
    <li className="nav-item"
    onClick={() => {
     
      $('.expense-list-filters').fadeIn('slow')
    }}
    >
        <a className="nav-link"><i className='fas fa-search'></i> Search expenses</a>
    </li>)
    } 
     
    <li className="nav-item">
        <NavLink className="nav-link" activeClassName='active-nav-link' to="/react/expenses/add"><i className='fas fa-coins'></i> Add expense</NavLink>
    </li>
    <li className="nav-item">
        <Logout />
    </li>
     <li className="nav-item">
        <a className="nav-link" href="/"><i className='fas fa-book'></i> Storybook</a>
    </li>
    </Fragment>
    }
  </ul>
      
  </div>
  </div>
</nav>
      </Fragment>
    );
  }
}

export default connect(state => state)(Header);