const URL = window.location.href.slice(0,-1);
// TODO remove when we implement auth
// end
let selectedPlaylistId = '';
let selectedSongId = '';
let selectedSearchResult = {};
let player = null;

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

  // TODO we may not need This
  getAllPlaylists();
});

function searchResultsToggle(){
  let elem = document.getElementById('youtube-search');
  if(elem.style.display === 'none'){
    elem.style.display = 'inline';
  }else{
    elem.style.display = 'none';
  };
}

function youtubeSearchToggle(){
  let elem = document.getElementById('searchForm');
  if(selectedPlaylistId === ''){
    elem.style.display = 'none';
  }else{
    elem.style.display = 'inline';
  };
}
