import React, {Fragment, Component} from 'react'
//import $ from 'jquery';
import $ from '../js/jquery-3.4.1.min';
import '../js/bootstrap-4.3.1.min.css';


class Social extends Component {
  state = {
    likes: 29,
    favourites: 4,
  };
  
  clickFavourite = (e) => {
    console.log('e', e.target.getAttribute('data-favourites'));
  //  const elem = e.target.getAttribute('data-favourites');
  const likeBtn = $(e.target).attr('data-likes');
  const favouritesBtn = $(e.target).attr('data-favourites')
  
    if(favouritesBtn && favouritesBtn === 'add'){
      this.setState(prevState => {
     return {
       favourites: ++prevState.favourites,
     }
   });
   
    }
    else if (favouritesBtn && favouritesBtn === 'minus'){
      this.setState({favourites: --this.state.favourites});
    }
    else if (likeBtn && likeBtn === 'add'){
      this.setState({likes: ++this.state.likes});
    }
    else if (likeBtn && likeBtn === 'minus'){
      this.setState({likes: --this.state.likes});
    }
   
  };
  render() {
    return (
    <Fragment>
    My favourites counts:  {this.state.favourites}
    <hr />
    <div>
   <button 
   className={'btn btn-primary btn-lg'}
   onClick={this.clickFavourite} 
   data-favourites='add'>+ favourites</button>
    <button
    className='btn btn-sm btn-dark ml-4'
    onClick={this.clickFavourite}
     data-favourites='minus'>- favourites</button>
    </div>
    <hr />
      <div>
   <button 
   className={'btn btn-primary btn-lg'}
   onClick={this.clickFavourite} 
   data-likes='add'>+ likes</button>
    <button
    className='btn btn-sm btn-dark ml-4'
    onClick={this.clickFavourite}
     data-likes='minus'>- likes</button>
    </div>
    <hr className='mb-4'/>
    <h1>My likes counts: {this.state.likes}</h1>
    </Fragment>
    )
  };
};

export default Social;

