import $ from 'jquery';
import './eruda';

console.log("NODE_ENV", process.env.test_TEST, typeof process.env.test_TEST);

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/base.css';
import './css/style.less';

//import '../../public/fontawesome-free-5.8.2-web/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'

import axios from 'axios';
import ckeditorIniatializer from './helpers/ckeditor';

import floatingFooterFix from './helpers/floatingFooterFix';

import './events';



$(function(){
  // fix upload filename
  bsCustomFileInput.init();
  
  // CKEDITOR for textarea
  //ckeditorIniatializer();

  // floating footer
  floatingFooterFix();
  
 
}); // end onload

