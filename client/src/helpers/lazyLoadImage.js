import $ from 'jquery';

function lazyLoadImages() {
  
  let counter = 0, rect='', template='';
  const storyLinks = $('[data-story_image]');
  document.querySelectorAll('[data-story_image]').forEach(storyLink => {
    lazyload().observe(storyLink);
  });
  
  
 function lazyload() {
   
   const options = {
     rootMargin: '0px 0px 100px 0px',
     threshold: 0,
   };
   const io = new IntersectionObserver((entries, imgObserver) => {
     entries.forEach(entry => {
     
       if(entry.isIntersecting){ 
         
         const img =  entry.target.firstElementChild;
         img.src = entry.target.getAttribute('data-story_image')
         console.log(img);
         img.onload = function(){
           entry.target.style['background'] = 'transparent';
           img.classList.add('story-avatar-img-fade');
         }
         
         console.log(++counter);
         //imgObserver.disconnect();
         imgObserver.unobserve(entry.target);
       }
     })
   }, options);
   
   return io;
 };
 
 
 
}

export default lazyLoadImages;

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