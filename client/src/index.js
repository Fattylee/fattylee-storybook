import './eruda';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/style.less';
import './css/base.css';
//import './helpers/bootstrap-4.3.1.min.css'

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'

import axios from 'axios';
import ckeditorIniatializer from './helpers/ckeditor';
import alertBox from './helpers/alertBox';
import floatingFooterFix from './helpers/floatingFooterFix';
import modalBox from './helpers/modalBox';



/*
$( window ).on( "load", function() {

console.log( "window loaded" );

});*/


$(function(){
  console.log('on ready')
  // fix upload filename
  bsCustomFileInput.init();
  
  // CKEDITOR for textarea
  ckeditorIniatializer();

  // floating footer
  floatingFooterFix();
  
 
       
  
  let presignedUrlRes = '';
  $('#file').on('change', async function(e) {
      const file = $('#file')[0].files[0];
    
      if(!file){
        presignedUrlRes = '';
        display('', 'No image preview, pls. select an image', '#story-img', '#story-title');
        return;
      } 
     // grab the first image in the FileList object and pass it to the function
     
       renderImage(this.files[0]);
        
       // render the image in our view and get presignedUrl
       function renderImage(file) {
       
       // generate a new FileReader object
       var reader = new FileReader();
       
       // inject an image with the src url
       reader.onload = async function(event) {
       const the_url = event.target.result;
       display(the_url, 'Preview', '#story-img', '#story-title');
       
        const url = '/uploads';
     
     // getPresignedUrl
       presignedUrlRes = await axios.get(url, {
        params: {
          filename: file.name, 
          type: file.type,
          }
        });
        
       } // end reader.onload
       
       // when the file is read it triggers the onload event above.
       reader.readAsDataURL(file);
       }
      
    }); // end change story upload

    
    // on submit story image upload for add and edit
$('form#story')
 .on('submit', function(e){
        e.preventDefault();
        const key = $(e.target).attr('data-name');
        const control = {
          add: {
            loadingMessage: 'Creating story...',
          },
          edit: {
            loadingMessage: 'Editing story...',
          }
        };
         
        let imageName='', url='', imageUrl='';
        
        // no presignedUrl
        if(!presignedUrlRes){
          e.target.submit();
          return;
        }
        
         ({imageName, url: imageUrl } = presignedUrlRes.data);
        const file = $('#file')[0].files[0];
        
        // no selected file
         if(!file){
           e.target.submit();
          return;
         } 
         // update avatar name 
         const elem = $(this).find('[type=hidden][name=storyImage]');
        elem.val(imageName);
        
        const loadingHandler =  loading(`button[data-name='${key}']`, control[key].loadingMessage);
        
        // upload to google buckets
         axios.put(imageUrl, file, { 
        headers: {
           'Content-Type': file.type,
           },
      })
      .then( res => {
        e.target.submit();
      })
      .catch(err => {
        loadingHandler();
        alertBox(); 
      });
        
      }); // end submit story image upload
      
    
    $('form input#profile-image').on('change', async function(e) {
     
      const file = $('#profile-image')[0].files[0];
    
      if(!file){
        presignedUrlRes = '';
        display('', 'No image preview, pls. select an image', '#profile-img', '#profile-title');
        return;
      } 
     // grab the first image in the FileList object and pass it to the function
     
       renderImage(this.files[0]);
        
       // render the image in our view and get presignedUrl
       function renderImage(file) {
       
       // generate a new FileReader object
       var reader = new FileReader();
       
       // inject an image with the src url
       reader.onload = async function(event) {
       const the_url = event.target.result;
       display(the_url, 'Preview', '#profile-img', '#profile-title');
       
        const url = '/uploads';
     
     // getPresignedUrl
       presignedUrlRes = await axios.get(url, {
        params: {
          filename: file.name, 
          type: file.type,
          }
        });
        
       } // end reader.onload
       
       // when the file is read it triggers the onload event above.
       reader.readAsDataURL(file);
       }
      
    }); // end change
  
    
    // on submit profile upload 
$('form#update')
 .on('submit', function(e){
        e.preventDefault();
        
        let imageName='', url='';
        
        // no presignedUrl
        if(!presignedUrlRes){
          e.target.submit();
          return;
        }
        
         ({imageName, url: imageUrl } = presignedUrlRes.data);
        const file = $('#profile-image')[0].files[0];
        
        // no selected file
         if(!file){
           e.target.submit();
          return;
         }
         
         // update avatar name 
         const elem = $(this).find('[type=hidden][name=avatar]');
        elem.val(imageName);
        
        const loadingHandler =  loading('#updateProfileBtn', 'Updating...');
        
        // upload to google buckets
         axios.put(imageUrl, file, { 
        headers: {
           'Content-Type': file.type,
           },
      })
      .then( res => {
        e.target.submit();
      })
      .catch(err => {
        loadingHandler();
        alertBox();
      });
        
      }); // end submit profile upload
      
     
    // submit event for each delete story
$('.delete-stories').submit(function(e){
  
  const dynamicId = 'delete-story-' + Math.ceil(10000 * Math.random());
  
  const launcherSelector = '#' + dynamicId + 'y';
  
  // add dynamicId to launcherButton
  $(e.target).attr('id', dynamicId + 'y');
  
   // DELETE story modalBox
    modalBox({
      modalID: dynamicId,
      actionButton: `
     <form action="${$(launcherSelector).attr('action')}" method="post">
    <button type="submit" class="btn btn-block btn-danger">Delete story</button>
  </form>
    `, 
    launcherSelector, 
    launcherClasses: 'btn-block',
    title: 'Delete  story',
    body: `Are you sure you want to delete this story "${$(launcherSelector).closest('.card-footer').prev().find('h4').text()}"?`,
    launcherText: 'Delete story'
    }); // end DELETE story modalBox   
 
    $(`[data-target="#${dynamicId}"]`)[0].click();
   
}); // end submit event for each delete story
    
   
    
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
    
    
     function display(url, caption, imageSelector, titleSelector){
       $(imageSelector).attr('src', url);
       $(titleSelector).text(caption);
       };// end display
      
    function loading(selector, text){
      const initialText = $(selector).text();
       const loader = $(selector)
       .empty()
       .append('<span class="spinner-border spinner-border-sm"></span> ' + text)
       .attr('disabled', '');
       
       return () => {
         $(selector).
         text(initialText)
         .removeAttr('disabled');
       };
    };// end loading
    
 
}); // end onload

