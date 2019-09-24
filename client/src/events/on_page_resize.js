import $ from 'jquery';
import floatingFooterFix from '../helpers/floatingFooterFix';


export default () => {
$(window).on('resize', function(e){
       
       floatingFooterFix(); 
      }); // end resize
}