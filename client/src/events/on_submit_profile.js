import $ from 'jquery';
import {presignedUrlResProfile as presignedUrlRes} from './on_change_profile';
import loading from '../helpers/loading';
import alertBox from '../helpers/alertBox';
import axios from 'axios';



export default () => {
    // on submit profile upload 
$('form#update')
 .on('submit', function(e){
        e.preventDefault();
        
        let imageName='', url='', imageUrl='';
         const loadingHandler =  loading('#updateProfileBtn', 'Updating...');
        
        // no presignedUrl
        if(!presignedUrlRes){
         
          e.target.submit();
          return;
        }
        console.log('b4 imageUrl', imageUrl);
         ({imageName, url: imageUrl } = presignedUrlRes);
         console.log('imageUrl', imageUrl);
        const file = $('#profile-image')[0].files[0];
        
        // no selected file
         if(!file){
           e.target.submit();
          return;
         }
         
         // update avatar name 
         const elem = $(this).find('[type=hidden][name=avatar]');
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
        
      }); // end submit profile upload
}

