import $ from 'jquery';

export default () => {
  // fixed floation footer
  
  const footer = document.getElementById('fixed-bottom');
  document.body.clientHeight  <=  window.innerHeight ? (() => {
  footer.classList.add('fixed-bottom');
  footer.classList.remove('off');
  })() : footer.classList.remove('off');
  
  // desktop settings
  // remove bg-black class from second column
  const bgBlack = document.querySelector('.bg-black');
  window.innerWidth > 500 && (() => {
    bgBlack && bgBlack.classList.remove('bg-black');
     // add-light color to footer's links
    $('.add-light').addClass('text-black');
    
    // add autofocus to reset password text input
    $('#email-reset-password').focus();
  })() ;
};