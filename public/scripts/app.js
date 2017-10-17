const URL = window.location.href.slice(0,-1);
// TODO remove when we implement auth
let user;
// end
let selectedPlaylistId;
let selectedSongId;

$(document).ready(function(){
  // pull initial data
  setCurrentUser();

  $('#createPlaylistBtn').click(postPlaylist);
  $('#deletePlaylistBtn').click(deletePlaylist);
  // set up event listeners
  // TODO submit playlist
  // TODO select individual playlist
  // TODO select individual song
  // TODO submit song
  // TODO remove song
  // TODO edit playlist name

  // TODO raul
  $('#createSongBtn').click(postSong);
  $('#deleteSongBtn').click(deleteSong);
});

//
// AJAX CALLS
//
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
    success: res => {
      // TODO show new item in list - need a method for this?
    }, // refresh view
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
  let newSong = $('#songName').val();
  $.ajax({
    method: 'POST',
    url: `${URL}/playlists/${selectedPlaylistId}/songs`,
    dataType: 'json',
    data: {
      youTubeHash: newSong
    },
    success: () => {}, // refresh view?
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
    error: onError
  });
}

//
// CALLBACKS
//
function displaySongs(res) {
  // console.log(selectedPlaylistId);
  // console.log(res);
  let songContainer = $('.song-container');
  songContainer.empty();
  res.forEach(song => {
    let liStr = `<li class="songItem" id="${song._id}">${song.youTubeHash}</li>`;
    songContainer.append(liStr);
    let li = $('.song-container li').last();
    li.click(e => {
      if(selectedSongId){
        $(`#${selectedSongId}`).removeClass('selectedSong');
      }
      selectedSongId = e.target.id;
      e.target.className += ' selectedSong';
    })
  });
};

function displayAllPlaylists(res) {
  res.forEach(playlist => {
    let liStr = `<li class="playlistItem" id="${playlist._id}">${playlist.name}: ${playlist.description}</li>`;
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
  });
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
