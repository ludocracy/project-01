//
// YOUTUBE EMBED CODE
//
function onPlayerReady(event) {
  event.target.playVideo();
}

let playingSongId = '';
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    playingSongId = player.getVideoData()['video_id'];
  } else if (event.data === YT.PlayerState.ENDED) {
    let lastSongLi = $(`.songItem[youtube-hash=${playingSongId}]`);
    let nextSong = lastSongLi.next();
    let songId = '';
    if(nextSong.length) {
      songId = nextSong.attr('youtube-hash');
    } else if($(`.songItem`).length) {
      songId = $(`.songItem:nth-child(1)`).attr('youtube-hash');
    }
    setUpPlayer(songId);

    getSongs();
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

// allows showSearchThumbnail to get one thumbnail from individual search result
let searchResults = [];

function displaySearchResults(res) {
  let searchContainer = $('.song-search-results');
  searchContainer.empty();
  searchResults = res.items;
  searchResults.forEach(result => {
    let id = result.id.videoId;
    let name = result.snippet.title;
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
  let imgStr = `<img src="${thumbnailUrl}" id="thumbnail-photo"></img>`;
  thumbnailDiv.append(imgStr);
}

function setUpPlayer(videoId) {
  if(!videoId) { return; }
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
