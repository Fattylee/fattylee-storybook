import $ from 'jquery';



export default () => {
  
  $('#search-title').on('click', async function(e) {
 
    
    const clear = () => 
     {
   /// remove previous textbox and display:none from the dom
    $('.searchBox-container').remove();
    $('.get-title').css({display: 'block'});
    };
    
    clear();
     const searchBox = $(`
     <div class='searchBox-container'>
       <input type="text" placeholder="Search story by title" class="search-box"/>
       <span class='close-span fas fa-times  fa-1x text-center pt-3'></span>
       <span class='match-count'>999</span>
     </div>`).
     css({
       borderBottom: '1px solid blue',
       borderRadius: '5px 5px 0 0', 
       width: '80%',
       position: 'fixed',
       left: '10%',
       marginTop: '20px',
       zIndex: 1000,
       overflow: 'hidden',
     }).hide();
     
     $('.body').before(searchBox.slideDown());
       
       $('.search-box').css({
       padding: '10px 50px 10px 15px',
       outline: 'none',
       border: 'none',
       width: 'calc(100% - 40px)',
       background: 'rgba(0,0,0,0.8)',
       color: 'white',
     });
     const baseCss = {
       position: 'absolute',
       right: '0px',
       top: '0px',
       color: 'white',
       background: 'red',
       height: '200px',
       width: '40px',
       paddingTop: '10px',
       cursor: 'pointer',
       
     };
     
     $('.close-span').css(baseCss).on('click', () => {
       clear();
     });
     $('.match-count').css({
       ...baseCss,
       right: '40px',
       //background: 'transparent',
       cursor: 'auto',
       textAlign: 'center',
       background: 'rgba(0,0,0,0.9)',
     });
       $('.match-count').text($('.get-title').length);
     searchBox.focus();
     searchBox.click();
     
     
   
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
         //console.log(titleText, 'matched!');
       }
       
     }
     
     })
     return;
     
      
    }); // end change


}