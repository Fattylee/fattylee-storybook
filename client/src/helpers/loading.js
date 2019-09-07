import $ from 'jquery';

export default function loading(selector, text){
      const initialText = $(selector).text();
       const loader = $(selector)
       .empty()
       .append('<span class="spinner-border spinner-border-sm"></span> ' + text)
       .attr('disabled', '');
       
       return () => {
         $(selector).
         text(initialText)
         .removeAttr('disabled');
       };
    };// end loading