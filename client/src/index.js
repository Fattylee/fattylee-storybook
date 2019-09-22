import $ from 'jquery';

import 'intersection-observer'; 

if(process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  console.log('eruda loaded');
  require('./eruda');
  
}

console.log('swe', process.env.NODE_ENV);
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/base.css';
import './css/style.less';

import '../../playground/public/fontawesome-free-5.8.2-web/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'

import axios from 'axios';
import ckeditorIniatializer from './helpers/ckeditor';

import floatingFooterFix from './helpers/floatingFooterFix';

import './events';

import lazyLoadImage from './helpers/lazyLoadImage';
import removeTrailingHash from './helpers/removeTrailingHash';


$(window).on('load', (e) => {
  e.preventDefault(); // no page reload
  console.log('on load');
  // fix upload filename
  bsCustomFileInput.init();
  
  // CKEDITOR for textarea
  //ckeditorIniatializer();

  // floating footer
  floatingFooterFix();

  // lazyLoadImage 
  lazyLoadImage();
 
  removeTrailingHash();
 
}); // end onload