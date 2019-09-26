import $ from 'jquery';


export default () => {
 
 const flash = $('[role="alert"]'); 
 if(flash.length){
   setTimeout(() => flash.fadeOut(), 5000);
 }
  
}
