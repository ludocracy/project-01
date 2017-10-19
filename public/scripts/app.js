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
  let elem = document.getElementById('youtube-search-res');
  let btn = document.getElementById('youtube-search-btn');
  if(elem.style.visibility === "hidden"){
    elem.style.visibility = "visible";
    btn.onclick = '';
  }else{
    btn.onclick = function() {searchResultsToggle()};
    elem.style.visibility = 'hidden';
  };
  $('#song-search-thumbnail').empty();
}

function youtubeSearchToggle(){
  let elem = document.getElementById('searchForm');
  if(selectedPlaylistId === ''){
    elem.style.visibility = 'hidden';
  }else{
    elem.style.visibility = 'visible';
  };
}
