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
 
 
 
 
 
 
 function display(url, caption){
       $('#profile-img').attr('src', url).parent().prev().text(caption);
       }// end display
       loading()
    function loading(){
       const initialBodyHtml = $('.body').html();
       const initialBodyHeight = $('.body').height();
       
       
       let loader = $('<h1>Loding...</h1>')//.css({backgroundColor: 'chocolate'});
       const size = '250px';
       loader = $(`
       <div class="spinner-border text-primary"></div>`).height(initialBodyHeight).css({
         fontSize: '10rem',
         width: size,
         height: size
         });
         
       const wrapLoader = $('<h1>')
       .css({
         height: innerHeight ,
         backgroundColor: 'pink',
         color: 'red',
         //textAlign: 'center'
         })
         .addClass('d-flex justify-content-center align-items-center'); 
         
         
         
         
       $('.body').fadeOut('fast').after(loader.fadeIn(1000, function(){
         $(this).wrap(wrapLoader);
       }));
       return initialBodyHtml;
    }// end loading
    
    
    function restore(html){
      $('.body').html(html);
    }// end restore
    
    console.log( 
      $(window).height(),
      $(window).innerHeight(), 
      $(window).outerHeight()
    );
    
    console.log(
      $(document).height(),
      $(document).innerHeight(), 
      $(document).outerHeight()
    );
    
    
    function alertBox(){
    const div = $('<h1>Abu</h1>').slideUp('slow');
        $('.body')
        .before(
        div
        .fadeIn(2000, function(){
          $(this).click(function(){
            $(this).toggle(2000, function(){
              $(this).remove()
            })
          })
        })
        );
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