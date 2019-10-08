import $ from 'jquery';

const  alertBox = (options = {}) => {
      const {
        type = 'danger',
        duration = 3000,
        speed = 400,
        message = 'Network error, please try again later',
      } = options;
      
    const alertMsgHandler = $(`<div class="container" id='alert'>
      <div class='row justify-content-md-center'>
        <div class='col-md-12'>
          
  <div class="alert alert-${type} fade show" role="alert"
  >${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span> 
    </button>
  </div>

        </div>
      </div>
    </div>`)
    .css({
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '400px',
        zIndex: '10000'
      })
    .hide().fadeIn(400);
    
    $('body').after(alertMsgHandler);
    setTimeout(() => {
      alertMsgHandler.fadeOut(speed, () => alertMsgHandler.remove())
    }, duration);
    
    $('button.close[data-dismiss="alert"]').on('click', function(){
      alertMsgHandler.remove();
    });
    }; // end alertBox

export default alertBox;