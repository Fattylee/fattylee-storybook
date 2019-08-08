$(function(){
  bsCustomFileInput.init();
  
  if($('textarea#details').length) {
    CKEDITOR.replace('details');
  }
  
  // fit floation footer
  document.body.clientHeight <=  window.innerHeight && document.querySelector('#fixed-bottom').classList.add('fixed-bottom');
  
});