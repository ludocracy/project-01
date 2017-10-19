// pulls URL of the backend from browser
const URL = window.location.href.slice(0,-1);

// global variables
let selectedPlaylistId = '';
let selectedSearchResult = {};
let player = null;

// TODO: re-eval keeping this
let selectedSongId = '';


$(document).ready(function(){
  // embed youtube video player
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $('#createPlaylistBtn').click(postPlaylist);
  $('#deletePlaylistBtn').click(deletePlaylist);

  $('#searchForm').submit(searchSong);
  $('#createSongBtn').click(postSong);
  $('#deleteSongBtn').click(deleteSong);

  // TODO: move this once users have been integrated
  // note: we need this for admin page
  getAllPlaylists();
});
