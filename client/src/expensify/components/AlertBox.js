import React, {Fragment, Component} from 'react';
import alertBox from '../../helpers/alertBox';
import $ from 'jquery';

export default class AlertBox extends Component {
  
  componentWillUnmount() {
    $('.container#alert').remove();
  }
  render() {
    const {message, duration} = this.props;
    
    alertBox({message, duration});
    return null;
  }
}