import $ from 'jquery';
import './eruda';



//import icon from './storybook.png';
import icon from '../../public/img/500-Error-Page-Template.gif';




import 'bootstrap/dist/css/bootstrap.min.css';
import './css/base.css';
import './css/style.less';

//import '../../public/fontawesome-free-5.8.2-web/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bsCustomFileInput from 'bs-custom-file-input'

import axios from 'axios';
import ckeditorIniatializer from './helpers/ckeditor';

import floatingFooterFix from './helpers/floatingFooterFix';

import './events';



$(function(){
  console.log('on load');
  // fix upload filename
  bsCustomFileInput.init();
  
  // CKEDITOR for textarea
  //ckeditorIniatializer();

  // floating footer
  floatingFooterFix();

console.log('b4 image icon');
const img = new Image();
//img.src =  icon;
//img.src = 'https://via.placeholder.com/600/92c952';
//img.src = 'https://images.pexels.com/photos/2887493/pexels-photo-2887493.jpeg?cs=srgb&dl=aerial-shot-architecture-bridge-2887493.jpg&fm=jpg';
img.src = 'https://pixabay.com/photos/landscape-sea-storm-rays-sky-4474345/';
img.src = 'https://unsplash.com/photos/jS0ysot7MwE';
img.src = 'https://www.freeimages.com/download/file/1ddf421e805ac6d6f95a2aa7d8238605/1599x667'; //1.3mb 

img.onload = function(){
  const ph = document.querySelector('.pa');
  ph.style['background-image'] = `url(${img.src})`;
  console.log('image icon completed!');
};
//$('.body').before(img);
/*.before($('<h1>after img</h1>').addClass('img').css({
 // color: 'grey', 
  border: 'solid pink',
   //paddingBottom: '50%',
  //background: `url('dist/${icon}') repeat-y`,
  }));*/
console.log('after image icon');
console.log(icon, 'myImage', img);
//document.querySelector('.body').appendChild(img);


//$('.body').before(img);
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
   threshold: [0, 0.5, 1.0],
   root: document.querySelector('.parent-root'),
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
 
}); // end onload