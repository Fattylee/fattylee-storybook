import $ from 'jquery';


export default () => {
  
 $('nav.navbar').on('mouseleave', function(e){ 
 
 const btn = $(this).find('button')
 if(btn.attr('aria-expanded') === 'true') btn.click();
    
 })
};
