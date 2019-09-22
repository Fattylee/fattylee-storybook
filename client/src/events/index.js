import $ from 'jquery';
import on_change_story from './on_change_story';
import on_submit_story from './on_submit_story';
import on_change_profile from './on_change_profile';
import on_submit_profile from './on_submit_profile';
import on_submit_comment from './on_submit_comment';
import on_delete_story from './on_delete_story';
import on_delete_account from './on_delete_account';
import on_submit_login_register from './on_submit_login_register';
import on_search_story from './on_search_story';


$(() => {
  on_change_story();
  on_submit_story();
  on_change_profile();
  on_submit_profile();
  on_submit_comment();
  on_delete_story();
  on_delete_account();
  on_submit_login_register();
  on_search_story();
});