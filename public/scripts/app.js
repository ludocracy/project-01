const URL = 'http://localhost:3000';
// TODO remove when we implement auth
let user;
// end
let playlist;

$(document).ready(function(){
  // pull initial data
  setCurrentUser();

  // set up event listeners
  // TODO submit playlist
  // TODO select individual playlist
  // TODO select individual song
  // TODO submit song
  // TODO remove song
  // TODO edit playlist name
});

// ajax calls

function getAllPlaylists() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    success: displayPlaylists,
    error: onError
  });
}

function getOnePlaylist() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    success: displayPlaylists,
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

function postPlaylist(options={}) {
  $.ajax({
    method: 'POST',
    url: `${URL}/users/${user._id}/playlists`,
    dataType: 'json',
    data: options.data,
    success: () => {},
    error: onError
  });
}

function postSong(options={}) {
  $.ajax({
    method: 'POST',
    url: `${URL}/playlists/${options.playlistId}/songs`,
    dataType: 'json',
    data: options.data,
    success: () => {},
    error: onError
  });
}

function updatePlaylist(options={}) {
  $.ajax({
    method: 'PUT',
    url: `${URL}/playlists/${options.playlistId}`,
    dataType: 'json',
    data: options.data,
    success: () => {},
    error: onError
  });
}

// callbacks

function displaySongs() {

}

function displayPlaylists(res) {
  $('.playlists-container').text(res);
}

// helpers

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
