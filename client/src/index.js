import $ from 'jquery';
import axios from 'axios';
import 'intersection-observer'; 

if(process.env.NODE_ENV === 'development') { 
  require('./eruda');
  window.$j = $;
  window.axios = axios;
}


import 'bootstrap/dist/css/bootstrap.min.css';
import './css/base.css';
import './css/style.less';

import '../../playground/public/fontawesome-free-5.8.2-web/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'


import ckeditorIniatializer from './helpers/ckeditor';
import removeFlash from './helpers/removeFlash';
import floatingFooterFix from './helpers/floatingFooterFix';

import './events';

import lazyLoadImage from './helpers/lazyLoadImage';
import removeTrailingHash from './helpers/removeTrailingHash';


$(window).on('load', (e) => {
  
  
  
  // fix upload filename
  bsCustomFileInput.init();
  
  // CKEDITOR for textarea
  //ckeditorIniatializer();

  // floating footer
  floatingFooterFix();

  // lazyLoadImage 
  lazyLoadImage();
 
  removeTrailingHash();
  
  removeFlash();
  
 // const c = require('./expensify/helpers/on_close_navbar_react.js');
  //c();
 if(window.location.pathname.startsWith('/react')) {
   require('./expensify');
   require('./eruda');
 }
  
}); // end onload