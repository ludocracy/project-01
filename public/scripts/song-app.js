//
// AJAX CALLS
//
function getSongs() {
  $.ajax({
    method: 'GET',
    url: `/playlists/${PID}/songs`,
    dataType: 'json',
    success: displaySongs,
    error: (err) => { console.log(err); }
  });
}

function postSong() {
  $.ajax({
    method: 'POST',
    url: `/playlists/${PID}/songs`,
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
    url: `/playlists/${PID}/songs/${selectedSongId}`,
    dataType: 'json',
    success: res => {
      $(`#${selectedSongId}`).remove();
      selectedSongId = '';
    },
    error: (err) => { console.log(err); }
  });
}


//
// CALLBACKS
//
function addNewSong(res){
  let liStr = `<li class="songItem" youtube-hash="${res.youTubeHash}" id="${res._id}">${res.title}</li>`;
  $('.song-container').append(liStr);

  // TODO: rewrite to be less confusing
  // assigns variable to last list item/song that was added to song container
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

function searchResultsToggle(){
  let elem = document.getElementById('youtube-search-res');
  let btn = document.getElementById('youtube-search-btn');
  if(elem.style.visibility === "hidden"){
    elem.style.visibility = "visible";
    btn.onclick = '';
  }else{
    btn.onclick = function() {searchResultsToggle()};
    elem.style.visibility = 'hidden';
  };
  $('#song-search-thumbnail').empty();
}

// function youtubeSearchToggle(){
//   let elem = document.getElementById('searchForm');
//   if(selectedPlaylistId === ''){
//     elem.style.visibility = 'hidden';
//   }else{
//     elem.style.visibility = 'visible';
//   };
