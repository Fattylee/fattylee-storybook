import $ from 'jquery';

function preloadImages() {
  
  let counter = 0, rect='', template='';
  const storyLinks = $('[data-story_image]');
 
 function lazyload(target) {
   
   const options = {
     //rootMargin: '0px 0px -200px 0px',
   };
   const io = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
     
       if(entry.isIntersecting){ 
         entry.target.style['background'] = 'transparent';
         console.log(entry.target.firstElementChild);
         console.log(++counter);
         //observer.disconnect();
         observer.unobserve(entry.target);
       }
     })
   }, options);
   
   io.observe(target);
 };
 
 document.querySelectorAll('[data-story_image]').forEach(lazyload);
 
 // scroll event
  // window.onscroll = function (event) {
    /*$(window).scroll(function(event){ 
    console.log(counter);
    new Array(storyLinks.length)
  .fill(0)
  .forEach((storyLink, i) => {
    const story = new Image();
    const link = storyLinks[i].dataset['story_image'];
    //const link = storyLinks[i].getAttribute('data-story_image');
    const target = storyLinks[i];
    rect = target.getBoundingClientRect();
    console.log('rect:',++counter);
    for(const prop in rect){
      //if(typeof rect[prop] === 'function' || prop === 'x' || prop === 'y' || prop === 'height' || prop === 'width' || prop === 'left' || prop === "right") continue;
      if(prop !== 'top' && prop !== 'bottom') continue;
      
      template += `${prop}: ${Math.round(rect[prop])}, `; 
      
    }
    console.log(template, '...');
    template = '';
    //story.src = link;
    /*story.onload = function(){
      $('.story-avatar')[i].style['background-image'] = `url(${story.src})`;
      console.log('completed!!!', counter);
    };/
    
  });
  
   });*/ // end onscroll event
}

export default preloadImages;

// IIFE
(function(){
 const observer = new IntersectionObserver((entries, observer)=> {
   console.log('i av reached threshold');
   entries.forEach(entry => { // Each entry describes an intersection change for one observed // target element: // entry.boundingClientRect // entry.intersectionRatio // entry.intersectionRect // entry.isIntersecting // entry.rootBounds // entry.target // entry.time 
   if(entry.isIntersecting){
     console.log('now intersecting...');
   }
   });
 }, {
   //threshold: [0, 0.5, 1.0],
   //root: document.querySelector('.parent-root'),
 });
 
 const target = $('.target')[0];
// const target = $('<h1>I am the next target</h1>').css({border: '1px solid red'})[0];
 $('.body').after($('<div>Box after body</div>').css({
   background: 'red',
   color: 'white',
   paddingBottom: '100%',
   width: '100px'
 }));
 
 
 observer.observe(target);
 
 })//()