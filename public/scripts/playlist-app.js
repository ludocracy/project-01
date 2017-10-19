
// global variables
let selectedSearchResult = {};
let selectedSongId;
let player = null;
const PID = window.location.pathname.slice(1);

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
    url: `/playlists/${PID}`,
    dataType: 'json',
    success: displaySongs,
    error: (err) => { console.log(err); }
  });
}

// TODO probably gets called by clicking on playlist name when it appears in song list?
function updatePlaylist() {
  // TODO get updated name and description from song list display?
  $.ajax({
    method: 'PUT',
    url: `/playlists/${PID}`,
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
    url: `/playlists/${PID}`,
    dataType: 'json',
    success: res => {
      $(`#${PID}`).remove();
      PID = '';
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
  res.songs.forEach(song => {
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
