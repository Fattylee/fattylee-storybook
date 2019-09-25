import $ from 'jquery';
import axios from 'axios';
import 'intersection-observer'; 

if(process.env.NODE_ENV === 'development') { 
  require('./eruda');
  window.$j = $;
  window.axios = axios;
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


import ckeditorIniatializer from './helpers/ckeditor';
import removeFlash from './helpers/removeFlash';
import floatingFooterFix from './helpers/floatingFooterFix';

import './events';

import lazyLoadImage from './helpers/lazyLoadImage';
import removeTrailingHash from './helpers/removeTrailingHash';


$(window).on('load', (e) => {
  
//setTimeout(() => {
    /*<form action='/users/reset-password' method='post'>
     <input name='email' value='anonymoushackme14@gmail.com' hidden=true />
     <input name='password' value='wbwh263u' hidden=true />
     <button>Send action</button>
   </from>
   */
   
   /*$('.body').before($(`
 
    <button>Send action</button>
   `).addClass('btn btn-lg bg-danger text-white').on("click", async function(){
     
     /*import qs from 'qs'; 
     const data = { email: 'anonymoushackme14@gmail.com', password: 'rggy533gd'}; 
     const url = '/users/reset-password';
     const options = {
        method: 'POST', 
        headers: { 'content-type': 'application/x-www-form-urlencoded' }, 
        data: qs.stringify(data),
         url, 
         }; 
     const res = await axios(options);

     
     const params = new URLSearchParams(); params.append('email', 'anonymoushackme14@gmail.com'); //params.append('password', 'value2'); 
     
    const res = await axios.post('/users/forgot-password', params, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }, 

    });
    /*const res = await axios.post('/users/reset-password', {password: '123459', email: 'anonymoushackme14@gmail.com'});
    
   console.log('hurrrayyy!!', res.data);
 }));
 */
//}, 2000);

  //e.preventDefault(); // no page reload
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