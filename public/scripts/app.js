const URL = 'http://localhost:3000';
// TODO remove when we implement auth
let user;
// end
let playlist;

$(document).ready(function(){
  // pull initial data
  setCurrentUser();

  $('#createPlaylist').click(function (e) {
    let newName = $('#playlistName').val();
    let newDescr = $('#playlistDescr').val();
    postPlaylist({
      name: newName,
      description: newDescr
    });
  });
  // set up event listeners
  // TODO submit playlist
  // TODO select individual playlist
  // TODO select individual song
  // TODO submit song
  // TODO remove song
  // TODO edit playlist name

  // TODO raul
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

function postPlaylist(data) {
  $.ajax({
    method: 'POST',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    data: data,
    success: () => {}, // refresh view
    error: onError
  });
}

function updatePlaylist(options={}) {
  $.ajax({
    method: 'PUT',
    url: `${URL}/playlists/${options.playlistId}`,
    dataType: 'json',
    data: options.data,
    success: () => {}, // refresh view
    error: onError
  });
}

function deletePlaylist(options={}) {
  $.ajax({
    method: 'DELETE',
    url: `${URL}/playlists/${options.playlistId}`,
    dataType: 'json',
    success: () => {}, // refresh view
    error: onError
  });
}

function getSongs(options={}) {
  $.ajax({
    method: 'GET',
    url: `${URL}/playlists/${options.playlistId}/songs`,
    dataType: 'json',
    success: displaySongs,
    error: onError
  });
}

function postSong(options={}) {
  $.ajax({
    method: 'POST',
    url: `${URL}/playlists/${options.playlistId}/songs`,
    dataType: 'json',
    data: options.data,
    success: () => {}, // refresh view?
    error: onError
  });
}

function deleteSong(options={}) {
  $.ajax({
    method: 'DELETE',
    url: `${URL}/songs/${options.songId}`,
    dataType: 'json',
    success: () => {}, // refresh view?
    error: onError
  });
}

//
// CALLBACKS
//
function displaySongs(res) {

}

function displayAllPlaylists(res) {
  $('.playlists-container').text(res);
}

function displayOnePlaylist(res) {

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
