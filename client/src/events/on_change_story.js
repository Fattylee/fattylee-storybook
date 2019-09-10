import $ from 'jquery';
import display from '../helpers/display'
import alertBox from '../helpers/alertBox'
import axios from 'axios'



export let presignedUrlRes = '';

//on_change_profile.js
export default () => {
//export default () => {
  $('#file').on('change', async function(e) {
      const file = $('#file')[0].files[0];
    console.log('working', presignedUrlRes);
      if(!file){
        presignedUrlRes = '';
        display('', 'No image preview, please upload an image', '#story-img', '#story-title');
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
        if(file.size > 5 * 1024 * 1024){
          display('', 'No image preview, please upload an image', '#story-img', '#story-title');
          alertBox({message: 'image size can not exceed 5mb'});
          presignedUrlRes = '';
          return;
        }
     console.log('file size', file.size);
   
     // getPresignedUrl
      axios.get(url, {
        params: {
          filename: file.name, 
          type: file.type,
          }
        })
        .then( res => {
          presignedUrlRes = res.data;
          
        console.log(
        'on change: presignedUrlRes',
        presignedUrlRes);
        })
        .catch(err => {
         presignedUrlRes = '';
         console.log(
        'on change: presignedUrlRes',
        presignedUrlRes);
          display('', 'No image preview, please upload an image', '#story-img', '#story-title');
          alertBox({message: 'pls select another image'});
          return;
        });
        
        
       } // end reader.onload
       
       // when the file is read it triggers the onload event above.
       reader.readAsDataURL(file);
       }
      
    }); // end change story upload
}
