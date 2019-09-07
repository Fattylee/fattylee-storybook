import $ from 'jquery';
import loading from '../helpers/loading';
import alertBox from '../helpers/alertBox';


export default () => {
    // on submit profile upload 
$('form#add-comment')
 .on('submit', function(e){
        e.preventDefault();
        const loadingHandler =  loading('#comment-btn', 'Submitting...');
        
        const val = $('#body').val();
        if(!val.trim()){
          
          alertBox({message: 'Comment body can not be empty'});
          setTimeout(() =>loadingHandler(), 500);
          return;
          }
         
         e.target.submit();
        
      }); // end submit comment
      
}

