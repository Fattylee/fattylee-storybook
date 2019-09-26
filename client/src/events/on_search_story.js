import $ from 'jquery';



export default () => {
  
  $('#search-title').on('click', async function(e) {
 
 // close open navbar on mobile
    const btn = $('nav button');
 if(btn.attr('aria-expanded') === 'true') btn.click();

 // remove previous textbox and display:none from the dom
    const clear = () => 
     {
   
    $('.searchBox-container').remove();
    $('.get-title').css({display: 'block'});
    };
    
    clear();
     const searchBoxContainer = $(`
     <div class='searchBox-container'>
       <input type="text" placeholder="Search story by title" class="search-box"/>
       <span class='close-search-box fas fa-times  fa-1x text-center pt-3' title='close search box'></span>
       <span class='match-count'></span>
     </div>`)
     .hide();
     
     $('.body').before(searchBoxContainer.slideDown());
       
    const searchBox = $('.search-box');
     
     $('.close-search-box')
     .on('click', () => {
       clear();
     });
    
     $('.match-count').text($('.get-title').length);
       
     searchBox.focus();
     //searchBox.click();
     
   
     searchBox.on('keyup', function(e){
       let matchCounter = 0;
        $('.match-count').text(0);
       const textVal = e.target.value.toLowerCase();
       //console.log(textVal);
       const stories = $('.get-title');
       
     for (const el of stories) {
       el.style.display = 'none';
       
       const titleText = $(el).find('.story-card-title').text().toLowerCase();
       //console.log(titleText);
       if(titleText.includes(textVal)){
        el.style.display = 'block';
       // ++matchCounter;
        $('.match-count').text(++matchCounter);
         
       }
       
     }
     
     })
     return;
      
    }); // end change


}