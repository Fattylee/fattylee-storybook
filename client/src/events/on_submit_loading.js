import $ from 'jquery';

import loading from '../helpers/loading';

export default () => {
// on submit login and register
$('form.submit').on('submit', function(e){
        e.preventDefault();
        
        const key = $(e.target).attr('data-name');
        if(!key) return e.target.submit();
        
        const control = {
          login: {
            loadingMessage: 'Logging in...',
          },
          register: {
            loadingMessage: 'Registering...',
          },
          'forgot-password': {
            loadingMessage: 'Sending...',
          },
          'reset-password': {
            loadingMessage: 'Resetting password...',
          },
        };
        
       loading(`form[data-name='${key}'] button`, control[key].loadingMessage);
         e.target.submit();
      }); // end submit story image upload
}