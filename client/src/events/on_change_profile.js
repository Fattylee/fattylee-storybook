import $ from 'jquery';
import axios from 'axios';
import display from '../helpers/display';
import alertBox from '../helpers/alertBox';


export let presignedUrlResProfile = '';

export default () => {
  
  $('form input#profile-image').on('change', async function(e) {
     
      const file = $('#profile-image')[0].files[0];
    
      if(!file){
        presignedUrlResProfile = '';
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
   if(file.size > 3 * 1024 * 1024){
          display('', 'No image preview, please upload an image', '#profile-img', '#profile-title');
          alertBox({message: 'image size can not exceed 5mb'});
          presignedUrlResProfile = '';
          return;
        }
     console.log('file size', file.size);
     
     // presignedUrlResProfile
      axios.get(url, {
        params: {
          filename: file.name, 
          type: file.type,
          }
        })
        .then( res => {
          presignedUrlResProfile = res.data;
          
        console.log(
        'on change: presignedUrlRes',
        presignedUrlResProfile);
        })
        .catch(err => {
         presignedUrlResProfile = '';
         console.log(
        'on change: presignedUrlRes',
        presignedUrlResProfile);
          display('', 'No image preview, please upload an image', '#profile-img', '#profile-title');
          alertBox({message: 'pls select another image'});
          return;
        });;
        
       } // end reader.onload
       
       // when the file is read it triggers the onload event above.
       reader.readAsDataURL(file);
       }
      
    }); // end change
}
