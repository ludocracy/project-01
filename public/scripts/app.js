require('dotenv').config();

const URL = process.env.KOLLABOSCOPE_URL || 'http://localhost:3000';
// TODO remove when we implement auth
let user;
// end
let playlist;

$(document).ready(function(){
  // pull initial data
  setCurrentUser();
  getAllPlaylists();

  // set up event listeners
  // TODO submit playlist
  // TODO select individual playlist
  // TODO select individual song
  // TODO submit song
  // TODO remove song
});

// ajax calls

function getAllPlaylists() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user.id}/playlists`,
    dataType: 'json',
    success: displayPlaylists,
    error: onError
  });
}

function getOnePlaylist() {
  $.ajax({
    method: 'GET',
    url: `${URL}/users/${user.id}/playlists`,
    dataType: 'json',
    success: displayPlaylists,
    error: onError
  });
}

function getSongs(playlistId) {
  $.ajax({
    method: 'GET',
    url: `${URL}/playlists/${playlistId}/songs`,
    dataType: 'json',
    success: displaySongs,
    error: onError
  });
}

// callbacks

// helpers

// TODO re-implement when we add auth!!!
function setCurrentUser() {
  $.ajax({
    method: 'GET',
    url: URL + '/users',
    dataType: 'json',
    success: function (res) {
      user = res[0];
    },
    error: onError
  });
}

function onError(xhr) {
  console.log(xhr);
}
