$(function(){
  // fix upload filename
  bsCustomFileInput.init();
  
  // add CKEDITOR for textarea
  if($('textarea#details').length) {
    CKEDITOR.replace('details');
  }
  
  // fixed floation footer
  const footer = document.getElementById('fixed-bottom');
  document.body.clientHeight  <=  window.innerHeight ? (() => {
  footer.classList.add('fixed-bottom');
  footer.classList.remove('off');
  })() : footer.classList.remove('off');
  
  // remove bg-black class from second column
  const bgBlack = document.querySelector('.bg-black');
  window.innerWidth > 500 && (() => {
    bgBlack.classList.remove('bg-black');
     // add-light color to footer's links
    $('.add-light').addClass('text-black');
  })() ;
 
      
       
      let presignedUrlRes = '';
      
   $('form input#profile-image') && $('form input#profile-image').on('change', async function(e) {
     
      const file = $('#profile-image')[0].files[0];
    
      if(!file){
        const the_url = $('#prevAvatar').val();
        display(the_url, 'Profile');
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
       the_url = event.target.result;
       display(the_url, 'Preview');
       
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
    
    
    // on submit
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
        
      }); // end submit
      
      
     
     function display(url, caption){
       $('#profile-img').attr('src', url).parent().prev().text(caption);
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
    
    
    function restore(html){
      $('.body').html(html);
    }// end restore
    
    
    function alertBox(options = {}){
      const {
        type = 'danger',
        duration = 3000,
        speed = 400,
        message = 'Network error pls.try again',
      } = options;
      
    const alertMsgHandler = $(`<div class="container" id='alert'>
      <div class='row justify-content-md-center'>
        <div class='col-md-12 mt-4'>
          
  <div class="alert alert-${type} fade show" role="alert">${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span> 
    </button>
  </div>

        </div>
      </div>
    </div>`).hide().fadeIn(400);
    
    $('nav').after(alertMsgHandler);
    setTimeout(() => {
      alertMsgHandler.fadeOut(speed, () => alertMsgHandler.remove())
    }, duration);
    
    }; // end alertBox
    
    
  
    
    
    
    // jquery effects
    
    /*
      hide
      show
      slideUp
      slideDown
      fadeOut
      fadeIn
      toggle
      slideToggle
      delay
      
      $('.body').delay(1000).slideToggle('slow', () => {
      //alert('fijished!');
      $('.body').fadeToggle(1000);
      });
    
    */
 
}); // end onload