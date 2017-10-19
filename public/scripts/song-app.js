//
// AJAX CALLS
//
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
function addNewSong(res){
  let liStr = `<li class="songItem" youtube-hash="${res.youTubeHash}" id="${res._id}">${res.title}</li>`;
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
