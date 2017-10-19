//
// YOUTUBE EMBED CODE
//
function onPlayerReady(event) {
  event.target.playVideo();
}
let playingSongIndex = 1;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    // TODO play next song
    let songs = $(`.songItem`);
    if(playingSongIndex < songs.length) {
      playingSongIndex++;
    } else {
      playingSongIndex = 0;
    }
    let songLi = $(`.songItem:nth-child(${playingSongIndex})`)
    let songId = songLi.attr('youtube-hash');
    console.log();
    setUpPlayer(songId);

    // TODO check for updates
  }
}

//
// AJAX CALLS
//
function searchSong(e) {
  e.preventDefault();
  let searchStr = $('#songName').val();
  let query = queryString({
    q: searchStr,
    part: 'snippet',
    type: 'video',
    maxResults: '10',
    key: 'AIzaSyA57V2_-uR3DOFwmcmH8qZzr0ZXffXdaPY'
  });
  let url = `https://www.googleapis.com/youtube/v3/search${query}`
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'json',
    success: displaySearchResults,
    error: (err) => { console.log(err); }
  });
}



//
// CALLBACKS
//
let searchResults = [];
function displaySearchResults(res) {
  let searchContainer = $('.song-search-results');
  searchContainer.empty();
  searchResults = res.items;
  searchResults.forEach(result => {
    let id = result.id.videoId;
    let name = result.snippet.title;
    // TODO let contributor = currentUser();
    let liStr = `<li class="song-search-result" id="${id}">${name}</li>`;
    searchContainer.append(liStr);
    let li = $('.song-search-results li').last();
    li.click(e => {
      if(selectedSearchResult.id){
        $(`#${selectedSearchResult.id}`).removeClass('selectedSearchResult');
      }
      selectedSearchResult.id = e.target.id;
      selectedSearchResult.title = e.target.innerText;
      e.target.className += ' selectedSearchResult';
      showSearchThumbnail();
    });
  });
}

function showSearchThumbnail() {
  let thumbnailDiv = $('#song-search-thumbnail');
  thumbnailDiv.empty();
  let searchResultObj = searchResults.find(function(res) {
    return res.id.videoId === selectedSearchResult.id;
  });
  let thumbnailUrl = searchResultObj.snippet.thumbnails.high.url;
  let imgStr = `<img src="${thumbnailUrl}"></img>`;
  thumbnailDiv.append(imgStr);
}

function setUpPlayer(videoId) {
  if(player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('song-embed', {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

function queryString(obj) {
  let str = '?';
  for(key in obj) {
    let value = obj[key].replace(' ', '+');
    str += `${key}=${value}&`;
  }
  return str.substring(0, str.length-1);
}
