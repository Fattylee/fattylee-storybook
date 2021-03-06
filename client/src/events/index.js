import $ from 'jquery';
import on_change_story from './on_change_story';
import on_submit_story from './on_submit_story';
import on_change_profile from './on_change_profile';
import on_submit_profile from './on_submit_profile';
import on_submit_comment from './on_submit_comment';
import on_delete_story from './on_delete_story';
import on_delete_account from './on_delete_account';
import on_submit_loading from './on_submit_loading';
import on_search_story from './on_search_story';
import on_page_resize from './on_page_resize';
import on_close_navbar from './on_close_navbar';
import on_autofocus from './on_autofocus';

$(() => {
  
  on_change_story();
  on_submit_story();
  on_change_profile();
  on_submit_profile();
  on_submit_comment();
  on_delete_story();
  on_delete_account();
  on_submit_loading();
  on_search_story();
  on_page_resize();
  on_close_navbar();
 // on_autofocus(); //WIP
});