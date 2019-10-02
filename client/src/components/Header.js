import React, { Fragment, Component} from 'react';
import { NavLink, Link } from 'react-router-dom';


class Header extends Component {
  
  render () {
    console.log('see me',);
    return (
      <Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger shadow-dark-react">
<div className='container'>
  <NavLink className="navbar-brand" to="/react">Expensify</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
    
    
    <ul className="navbar-nav ml-auto">
   {/*{#if user}*/}
   
     <div className="dropdown">
    <a className="btn btn-danger dropdown-toggle nav-link text-left" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i className="fas fa-book"></i>  Story </a>
     
    
     <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
       
     {/*{#isNotEqual 'Stories' pageTitle}*/}
     <a className="dropdown-item text-dark" href="/stories"><i className="fas fa-book-open"></i> View stories</a>
     {/*{/isNotEqual}*/}
     
     {/*{#isNotEqual 'Create story' pageTitle}*/}
    <a className="dropdown-item text-dark" href="/stories/add"><i className="fas fa-plus"></i> Add story</a>
    {/*{/isNotEqual}*/}
    
    {/*{#isEqual 'Feeds' pageTitle}*/} 
      <div className="form-group dropdown-item">
        <input type="text" name="search-title" id="search-title" className="form-control" placeholder="Search story by title" />
      </div>
    {/*{/isEqual}*/}
     {/*{#isEqual 'Stories' pageTitle}*/}
      <div className="form-group dropdown-item">
        <input type="text" name="search-title" id="search-title" className="form-control" placeholder="Search story by title" />
      </div> 
    {/*{/isEqual}*/}
    
    </div> {/* end dropdown-menu */}
    </div>{/* end dropdown */}
 
   
    <li className="nav-item">
        <a className="nav-link " href="/users/me"> <img src='https://storage.cloud.google.com/storybook_uploads/{{user.avatar }}'
        width="20" height="25" alt="" className="img-fluid rounded-circle " /> <span>{/*{capitalizeEach user.name}*/}</span> </a>
    </li>
    <li className="nav-item ">
        <a className="nav-link" href="/users/logout"><i className='fas fa-sign-out-alt'></i> Logout</a>
    </li>
    
    
      {/*{else}*/}
      <li className="nav-item ">
        <a className="nav-link" href="/users/login"><i className='fas fa-user-lock'></i> Login</a>
      </li>
     <li className="nav-item">
        <a className="nav-link" href="/users/register"><i className='fas fa-user-plus'></i> Register</a> 
    {/*{/if}*/}
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/react/about"><i className='fas fa-user-plus'></i> About</Link>
    </li>
     <li className="nav-item">
        <Link className="nav-link" to="/react/news"><i className='fas fa-user-plus'></i> News</Link>
    </li>
     <li className="nav-item">
        <a className="nav-link" href="/"><i className='fas fa-user-plus'></i> Storybook</a>
    </li>
  </ul>
      
  </div>
  </div>
</nav>
      </Fragment>
    );
  }
}

export default Header;

