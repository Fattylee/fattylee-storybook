import $ from 'jquery';


function modalBox(options) {
      const {
        modalID = 'unique',
        title = 'Modal title',
        body = '...',
        actionButton = '<button type="button" class="btn btn-primary">Save changes</button> ',
        launcherSelector,
        launcherClasses,
        launcherText = 'Launch demo modal',
      } = options || {} ;
      
      const buttonTrigger = `
     
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-danger ${launcherClasses}" data-toggle="modal" data-target="#${modalID}">
      ${launcherText}
      </button>`;
      
      const modalTemplate = `
      
      <!-- Modal -->
      <div class="modal fade" id="${modalID}" tabindex="-1" role="dialog" aria-labelledby="${modalID}Label" aria-hidden="true">
      <div class="modal-dialog" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="${modalID}Label">${title}</h5>
     
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      ${body}
       <div>
       <small style='text-transform: lowercase' class='text-secondary'><span class="fas fa-bomb"></span> THIS ACTION IS NOT REVERSIBLE</small></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        ${actionButton}
      </div>
   </div>
   </div>
   </div>`;
     
     // inject after .body class
     $('.body')
      .after(modalTemplate);
    
     $(launcherSelector).before(buttonTrigger).remove();
     
     
    
    }// end modalBox
   
export default modalBox;
