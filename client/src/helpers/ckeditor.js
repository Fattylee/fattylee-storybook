import $ from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default () => {
   if($('textarea#details').length) {
   console.log('ck')
    ClassicEditor
      .create( document.querySelector('#details'))
      .catch( error => {
          console.error( error );
        });
 }
}
