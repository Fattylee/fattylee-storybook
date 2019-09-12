import $ from 'jquery';

export default () => {
  const dist = '20px';
  const btn = $('<a href="/stories/add"><i class="fas fa-plus"></i></a>')
  .addClass('btn btn-lg btn-primary rounded-circle ')
  .css({
    position: 'fixed',
    bottom: dist,
    right: dist,
    zIndex: '133444',
    boxShadow: '1px 2px 3px rgba(0,0,0,0.5)'
  });
  // btn-outline-dark  shadow-lg
  $('.body').prepend(btn);
  
}


