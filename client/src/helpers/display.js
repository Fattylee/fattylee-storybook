import $ from 'jquery';


export default function display(url, caption, imageSelector, titleSelector){
       $(imageSelector).attr('src', url);
       $(titleSelector).text(caption);
};// end display

