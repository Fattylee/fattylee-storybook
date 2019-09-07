import $ from 'jquery';
import on_change_story from './on_change_story';
import on_submit_story from './on_submit_story';
import on_change_profile from './on_change_profile';
import on_submit_profile from './on_submit_profile';
import on_submit_comment from './on_submit_comment';


//on_change_profile.js
$(() => {
  on_change_story();
  on_submit_story();
  on_change_profile();
  on_submit_profile();
  on_submit_comment();
});

