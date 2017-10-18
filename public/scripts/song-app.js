//
// AJAX CALLS
//

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

function displaySongs(res) {
  let songContainer = $('.song-container');
  songContainer.empty();
  res.forEach(song => {
    addNewSong(song);
  });
};

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
