import React, {Fragment, Component} from 'react';
import alertBox from '../../helpers/alertBox';
import $ from 'jquery';
import {connect} from 'react-redux';
import {setGlobalError} from '../actions/errorAction';


class AlertBox extends Component {
  
  componentWillUnmount() {
    console.log('alertBox removed');
    $('.container#alert').remove();
    
  }
  render() {
    let message,
    duration, 
    globalError = this.props.state.globalError;
    if(globalError) {
       ({message, duration} = globalError);
    }
    else {
       ({message, duration} = this.props);
    }
    
    alertBox({message, duration}, () => {
      console.log('called after removed');
      this.props.dispatch(setGlobalError());
    });
    return null;
  }
}


export default connect(state => ({state}))(AlertBox);