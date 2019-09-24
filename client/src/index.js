import $ from 'jquery';

import 'intersection-observer'; 

if(process.env.NODE_ENV === 'development') { 
  require('./eruda');
  window.$j = $;
}

/*

$j('*').on('click', function(e){
  console.log("click")
})

*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/base.css';
import './css/style.less';

import '../../playground/public/fontawesome-free-5.8.2-web/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'

import axios from 'axios';
import ckeditorIniatializer from './helpers/ckeditor';
import removeFlash from './helpers/removeFlash';
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
  
  removeFlash();
 
}); // end onload