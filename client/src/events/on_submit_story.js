import $ from 'jquery';
import {presignedUrlRes} from './on_change_story';
import loading from '../helpers/loading';
import alertBox from '../helpers/alertBox';
import axios from 'axios';

export default () => {
// on submit story image upload for 
    // add and edit
$('form#story').on('submit', function(e){
        e.preventDefault();
        console.log('submit story');
        
        const key = $(e.target).attr('data-name');
        console.log('key', key);
        
        const control = {
          add: {
            loadingMessage: 'Creating story...',
          },
          edit: {
            loadingMessage: 'Editing story...',
          }
        };
         
        
        console.log('presignedUrl', presignedUrlRes);
        // no presignedUrl
        if(key === 'add' && !presignedUrlRes){
          alertBox({message: 'please upload a valid image'}); 
         // e.target.submit();
         console.log('no presignedUrl')
          return;
        }
        
        let imageName='', url='', imageUrl='';
         ({imageName, url: imageUrl } = presignedUrlRes);
        const file = $('#file')[0].files[0];
        
        // no selected file
         if(key === 'add' && !file){
          alertBox({message: 'please upload a valid image'}); 
          console.log('no file')
          return;
         } 
         const loadingHandler =  loading(`button[data-name='${key}']`, control[key].loadingMessage);
         
         if(!presignedUrlRes || !file) {
            e.target.submit();
            return;
         }
         // update avatar name 
         const elem = $(this).find('[type=hidden][name=storyImage]');
        elem.val(imageName);
        
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
}