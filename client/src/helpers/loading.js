import $ from 'jquery';

export default function loading(selector, text){
      const initialText = $(selector).text();
       const loader = $(selector)
       .empty()
       .append('<span class="spinner-border spinner-border-sm mb-1"></span> ' + text)
       .attr('disabled', '');
       
       return () => {
         $(selector).
         text(initialText)
         .removeAttr('disabled');
     };
};// end loading