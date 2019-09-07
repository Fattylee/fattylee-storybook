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
  
  /*
    
      
    
    
    
     
   
   
    
// submit event for each delete account   
$('#delete-profile').submit(function(e){
   const dynamicId = 'delete-account-' + Math.ceil(10000 * Math.random());
  
  const launcherSelector = '#' + dynamicId + 'y';
  
  // add dynamicId to launcherButton
  $(e.target).attr('id', dynamicId + 'y');
  // DELETE account modalBox
    modalBox({
      modalID: dynamicId,
      actionButton: `
     <form action="/users/me?_method=DELETE" method="post">
    <button type="submit" class="btn btn-block btn-danger">Delete Account</button>
  </form>
    `, 
    launcherSelector, 
    launcherClasses: 'btn-block btn-danger',
    title: 'Delete account',
    body: 'Are you sure you want to delete your account?',
    launcherText: 'Delete account'
    }); // end DELETE account modalBox   
    
     $(`[data-target="#${dynamicId}"]`)[0].click();
});// end submit event for each delete account
    
    
     
      */
    
    
 
}); // end onload