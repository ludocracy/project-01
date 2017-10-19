const URL = window.location.href.slice(0,-1);
// TODO remove when we implement auth
let user;
// end
let selectedPlaylistId = '';
let selectedSongId = '';
let selectedSearchResult = {};
let player = null;

$(document).ready(function(){
  // pull initial data
  setCurrentUser();

  // embed youtube video player
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $('#createPlaylistBtn').click(postPlaylist);
  $('#deletePlaylistBtn').click(deletePlaylist);

  $('#searchForm').submit(searchSong);
  $('#createSongBtn').click(postSong);
  $('#deleteSongBtn').click(deleteSong);
});
