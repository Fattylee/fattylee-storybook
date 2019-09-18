import $ from 'jquery';


export default () => {
 
  const title = $('title').text();
  if (title.includes('Stories || Storybook')) {
    if (window.location.href.includes('#')) {
window.location.hash = ''; // for older browsers, leaves a # behind
history.pushState('', document.title, window.location.pathname); // nice and clean
 
} 
  }
  
}

