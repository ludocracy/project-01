const URL = window.location.href.slice(0,-1);
// TODO remove when we implement auth
let user;
// end
let selectedPlaylistId = '';
let selectedSongId = '';
let selectedSearchResultId = '';
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

//
// YOUTUBE EMBED CODE
//

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) {
    // TODO play next song
    // TODO
  }
}

//
// AJAX CALLS
//
function searchSong(e) {
  e.preventDefault();
  let searchStr = $('#songName').val();
  let query = queryString({
    q: searchStr,
    part: 'snippet',
    type: 'video',
    maxResults: '10',
    key: 'AIzaSyA57V2_-uR3DOFwmcmH8qZzr0ZXffXdaPY'
  });
  let url = `https://www.googleapis.com/youtube/v3/search${query}`
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'json',
    success: displaySearchResults,
    error: onError
  });
}

function getAllPlaylists() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    success: displayAllPlaylists,
    error: onError
  });
}

function getOnePlaylist() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    success: displayOnePlaylist,
    error: onError
  });
}

function postPlaylist() {
  let newName = $('#playlistName').val();
  let newDescr = $('#playlistDescr').val();
  $.ajax({
    method: 'POST',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    data: {
      name: newName,
      description: newDescr
    },
    success: addNewPlaylist,
    error: onError
  });
}

// TODO probably gets called by clicking on playlist name when it appears in song list?
function updatePlaylist() {
  // TODO get updated name and description from song list display?
  $.ajax({
    method: 'PUT',
    url: `${URL}/playlists/${selectedPlaylistId}`,
    dataType: 'json',
    data: {
      name: '',
      description: ''
    },
    success: displaySongs, // refresh view
    error: onError
  });
}

function deletePlaylist() {
  $.ajax({
    method: 'DELETE',
    url: `${URL}/playlists/${selectedPlaylistId}`,
    dataType: 'json',
    success: res => {
      $(`#${selectedPlaylistId}`).remove();
      selectedPlaylistId = '';
    },
    error: xhr => {
      console.log(xhr);
    }
  });
}

function getSongs() {
  $.ajax({
    method: 'GET',
    url: `${URL}/playlists/${selectedPlaylistId}/songs`,
    dataType: 'json',
    success: displaySongs,
    error: onError
  });
}

function postSong() {
  if(selectedPlaylistId === '') { return; }
  $.ajax({
    method: 'POST',
    url: `${URL}/playlists/${selectedPlaylistId}/songs`,
    dataType: 'json',
    data: {
      youTubeHash: `https://www.youtube.com/watch?v=${selectedSearchResultId}`
    },
    success: addNewSong,
    error: onError
  });
}

function deleteSong(){
  $.ajax({
    method: 'DELETE',
    url: `${URL}/playlists/${selectedPlaylistId}/songs/${selectedSongId}`,
    dataType: 'json',
    success: res => {
      $(`#${selectedSongId}`).remove();
      selectedSongId = '';
    },
    error: xhr => {
      console.log(xhr);
    }
  });
}

//
// CALLBACKS
//
function displaySearchResults(res) {
  let searchContainer = $('.song-search-results');
  searchContainer.empty();
  res.items.forEach(result => {
    let id = result.id.videoId;
    let name = result.snippet.title;
    // TODO let contributor = currentUser();
    let liStr = `<li class="song-search-result" id="${id}">${name}</li>`;
    searchContainer.append(liStr);
    let li = $('.song-search-results li').last();
    li.click(e => {
      if(selectedSearchResultId){
        $(`#${selectedSearchResultId}`).removeClass('selectedSearchResult');
      }
      selectedSearchResultId = e.target.id;
      e.target.className += ' selectedSearchResult';
      // embed player for current song
      // TODO move to displaySongs when we retool DB to handle just video ids and not urls
      if(player) {
        player.loadVideoById(selectedSearchResultId);
      } else {
        player = new YT.Player('song-embed', {
          height: '390',
          width: '640',
          videoId: selectedSearchResultId,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    });
  });
}

function displaySongs(res) {
  let songContainer = $('.song-container');
  songContainer.empty();
  res.forEach(song => {
    addNewSong(song);
  });
};

function displayAllPlaylists(res) {
  let playlistContainer = $('.playlists-container');
  playlistContainer.empty();
  res.forEach(playlist => {
    addNewPlaylist(playlist);
  });
}

function addNewPlaylist(res){
  let liStr = `<li class="playlistItem" id="${res._id}">${res.name}: ${res.description}</li>`;
  $('.playlists-container').append(liStr);
  let li = $('.playlists-container li').last();
  li.click(e => { // event listener for when user selects a playlist
    // TO DO: event listener that 'visibility: visible' for DIV containing playlist info
    if(selectedPlaylistId) {
      $(`#${selectedPlaylistId}`).removeClass('selectedPlaylist');
    }
    selectedPlaylistId = e.target.id;
    e.target.className += ' selectedPlaylist';
    getSongs();
  });
}

function addNewSong(res){
  let liStr = `<li class="songItem" id="${res._id}">${res.youTubeHash}</li>`;
  $('.song-container').append(liStr);
  let li = $('.song-container li').last();
  li.click(e => {
    if(selectedSongId){
      $(`#${selectedSongId}`).removeClass('selectedSong');
    }
    selectedSongId = e.target.id;
    e.target.className += ' selectedSong';
  })
}

// TODO re-implement when we add auth!!!
function setCurrentUser() {
  $.ajax({
    method: 'GET',
    url: URL + '/users',
    dataType: 'json',
    success: function (res) {
      user = res[0];
      getAllPlaylists();
    },
    error: onError
  });
}

function onError(xhr) {
  console.log(xhr);
}

function queryString(obj) {
  let str = '?';
  for(key in obj) {
    let value = obj[key].replace(' ', '+');
    str += `${key}=${value}&`;
  }
  return str.substring(0, str.length-1);
}
