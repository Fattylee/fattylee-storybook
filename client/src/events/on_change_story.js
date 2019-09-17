import $ from 'jquery';
import display from '../helpers/display'
import alertBox from '../helpers/alertBox'
import axios from 'axios'



export let presignedUrlRes = '';


export default () => {

  $('#file').on('change', async function(e) {
      const file = $('#file')[0].files[0];
    console.log('1 - working', presignedUrlRes);
      if(!file){
        presignedUrlRes = '';
        display('', 'No image preview, please upload an image', '#story-img', '#story-title');
        console.log('2 - no file', presignedUrlRes);
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
        // convert byte to megabyte
        if(file.size > 5 * 1024 * 1024){
          display('', 'No image preview, please upload an image', '#story-img', '#story-title');
          alertBox({message: 'image size can not exceed 5mb'});
          presignedUrlRes = '';
          console.log('3 - larger than 5mb', presignedUrlRes);
          return;
        }
     console.log('4 - file size (kB)', Math.ceil(file.size/1024));
   
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
        '5 - on change: presignedUrlRes',
        presignedUrlRes);
        })
        .catch(err => {
         presignedUrlRes = '';
         console.log(
        '6 - on change: error presignedUrlRes',
        presignedUrlRes, 'err', err);
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