import React, {Fragment, Component} from 'react';
import alertBox from '../../helpers/alertBox';
import $ from 'jquery';

export default class AlertBox extends Component {
  
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    $('.container#alert').remove();
  }
  render() {
    const {message, duration} = this.props;
    console.log('alertBox', message, duration);
    alertBox({message, duration});
    return null;
  }
}