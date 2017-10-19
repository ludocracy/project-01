
// global variables
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

  $('#deletePlaylistBtn').click(deletePlaylist);

  $('#searchForm').submit(searchSong);
  $('#createSongBtn').click(postSong);
  $('#deleteSongBtn').click(deleteSong);

  getOnePlaylist();
});


//
// AJAX CALLS
//
function getOnePlaylist() {
  $.ajax({
    method: 'GET',
    url: `/playlists`,
    dataType: 'json',
    success: displaySongs,
    error: (err) => { console.log(err); }
  });
}

// TODO create playlist and redirect to playlist's own page
function postPlaylist() {
  let newName = $('#playlistName').val();
  let newDescr = $('#playlistDescr').val();
  $.ajax({
    method: 'POST',
    url: `/playlists`,
    dataType: 'json',
    data: {
      name: newName,
      description: newDescr
    },
    success: redirectFunction,
    error: (err) => { console.log(err); }
  });
}

function redirectFunction(res){
  window.location.replace(`/playlistPage/${res._id}`);
}

// TODO probably gets called by clicking on playlist name when it appears in song list?
function updatePlaylist() {
  // TODO get updated name and description from song list display?
  $.ajax({
    method: 'PUT',
    url: `/playlists/${selectedPlaylistId}`,
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
    url: `/playlists/${selectedPlaylistId}`,
    dataType: 'json',
    success: res => {
      $(`#${selectedPlaylistId}`).remove();
      selectedPlaylistId = '';
    },
    error: (err) => { console.log(err); }
  });
}



//
// CALLBACKS
//
function displaySongs(res) {
  let songContainer = $('.song-container');
  songContainer.empty();
  res.forEach(song => {
    addNewSong(song);
  });
}

// function displayAllPlaylists(res) {
//   let playlistContainer = $('.playlists-container');
//   playlistContainer.empty();
//   res.forEach(playlist => {
//     addNewPlaylist(playlist);
//   });
// }


//when playlist is created, point window to /playlist/:(createdplaylistID)
  //fill (DOM manipulation) page with playlist info

// function addNewPlaylist(res){
//   res.redirect(`/${}`);
// }
