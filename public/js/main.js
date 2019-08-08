$(function(){
  
  bsCustomFileInput.init();
  
  if($('textarea#details').length) {
    CKEDITOR.replace('details');
  }
  
});
