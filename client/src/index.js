import './eruda';

import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/style.less';
import './css/base.css';

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'

import axios from 'axios';
import ckeditorIniatializer from './helpers/ckeditor';
import alertBox from './helpers/alertBox';
import display from './helpers/display';
import loading from './helpers/loading';
import floatingFooterFix from './helpers/floatingFooterFix';
import modalBox from './helpers/modalBox';
import './events';



$(function(){
  console.log('on load')
  // fix upload filename
  bsCustomFileInput.init();
  
  // CKEDITOR for textarea
  //ckeditorIniatializer();

  // floating footer
  floatingFooterFix();
  
 
}); // end onload