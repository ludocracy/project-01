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

//
// YOUTUBE EMBED CODE
//

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) {
    // TODO play next song
    // TODO check for updates
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
    error: (err) => { console.log(err); }
  });
}

function getAllPlaylists() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    success: displayAllPlaylists,
    error: (err) => { console.log(err); }
  });
}

function getOnePlaylist() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    success: displayOnePlaylist,
    error: (err) => { console.log(err); }
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
    error: (err) => { console.log(err); }
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
    error: (err) => { console.log(err); }
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
    error: (err) => { console.log(err); }
  });
}

function postSong() {
  if(selectedPlaylistId === '') { return; }
  $.ajax({
    method: 'POST',
    url: `${URL}/playlists/${selectedPlaylistId}/songs`,
    dataType: 'json',
    data: {
      title: selectedSearchResult.title,
      youTubeHash: selectedSearchResult.id
    },
    success: addNewSong,
    error: (err) => { console.log(err); }
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
let searchResults = [];
function displaySearchResults(res) {
  let searchContainer = $('.song-search-results');
  searchContainer.empty();
  searchResults = res.items;
  searchResults.forEach(result => {
    let id = result.id.videoId;
    let name = result.snippet.title;
    // TODO let contributor = currentUser();
    let liStr = `<li class="song-search-result" id="${id}">${name}</li>`;
    searchContainer.append(liStr);
    let li = $('.song-search-results li').last();
    li.click(e => {
      if(selectedSearchResult.id){
        $(`#${selectedSearchResult.id}`).removeClass('selectedSearchResult');
      }
      selectedSearchResult.id = e.target.id;
      selectedSearchResult.title = e.target.innerText;
      e.target.className += ' selectedSearchResult';
      showSearchThumbnail();
    });
  });
}

function showSearchThumbnail() {
  let thumbnailDiv = $('#song-search-thumbnail');
  thumbnailDiv.empty();
  let searchResultObj = searchResults.find(function(res) {
    return res.id.videoId === selectedSearchResult.id;
  });
  let thumbnailUrl = searchResultObj.snippet.thumbnails.high.url;
  let imgStr = `<img src="${thumbnailUrl}"></img>`;
  thumbnailDiv.append(imgStr);
}

function setUpPlayer(videoId) {
  if(player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('song-embed', {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
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
    if(selectedPlaylistId) {
      $(`#${selectedPlaylistId}`).removeClass('selectedPlaylist');
    }
    selectedPlaylistId = e.target.id;
    e.target.className += ' selectedPlaylist';
    getSongs();
  });
}

function addNewSong(res){
  let liStr = `<li class="songItem" id="${res._id}">${res.title}</li>`;
  $('.song-container').append(liStr);
  let li = $('.song-container li').last();
  li.click(e => {
    if(selectedSongId){
      $(`#${selectedSongId}`).removeClass('selectedSong');
    }
    selectedSongId = e.target.id;
    e.target.className += ' selectedSong';
    setUpPlayer(res.youTubeHash);
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
    error: (err) => { console.log(err); }
  });
}

function queryString(obj) {
  let str = '?';
  for(key in obj) {
    let value = obj[key].replace(' ', '+');
    str += `${key}=${value}&`;
  }
  return str.substring(0, str.length-1);
}
