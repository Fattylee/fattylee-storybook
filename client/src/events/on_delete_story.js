import $ from 'jquery';
import alertBox from '../helpers/alertBox';
import modalBox from '../helpers/modalBox';
import loading from '../helpers/loading';
import uuid from 'uuid/v1';

export default () => {
 // submit event for each delete story
$('.delete-stories').submit(function(e){
  e.preventDefault();
  console.log('working');
  const dynamicId = 'delete-story-' + uuid();
  
  const launcherSelector = '#' + dynamicId + 'y';
  
  // add dynamicId to launcherButton
  $(e.target).attr('id', dynamicId + 'y');
  
  const actionUrl = $(launcherSelector).attr('action');
  
  
  
   // DELETE story modalBox
    modalBox({
      modalID: dynamicId,
      actionButton: `
     <form action="${actionUrl}" method="post">
    <button type="submit" class="btn btn-block btn-danger">Delete story</button>
  </form>
    `, 
    launcherSelector, 
    launcherClasses: 'btn-block',
    title: 'Delete  story',
    body: `Are you sure you want to delete this story "${$(launcherSelector).closest('.card-footer').prev().find('h4').text()}"?`,
    launcherText: 'Delete story'
    }); // end DELETE story modalBox   
 
    $(`[data-target="#${dynamicId}"]`)[0].click();
   
   const deleteBtnSelector = `[action="${actionUrl}"] button`;
   
   $(deleteBtnSelector).on('click', function(e){
     
     const loadingHandler =  loading(deleteBtnSelector, 'Deleting...');
     const form = $(this).parent();
     console.log(form.submit(), form[0])
         
   })
}); // end submit event for each delete story
};

