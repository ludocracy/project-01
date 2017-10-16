require('dotenv').config();

const URL = process.env.KOLLABOSCOPE_URL || 'http://localhost:3000';

$(document).ready(function(){
  // display all playlists for dummy user
});

function getPlaylists(options) {
  $.ajax({
    method: 'GET',
    url: getURL(options),
    dataType: 'json',
    success: displayPlaylists,
    error: onError
  });
}

function getSongs() {

}
