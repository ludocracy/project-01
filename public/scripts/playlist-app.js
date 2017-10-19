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


//
// CALLBACKS
//


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