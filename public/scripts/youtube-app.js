

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
    error: onError
  });
}


//
// CALLBACKS
//

function displaySearchResults(res) {
  let searchContainer = $('.song-search-results');
  searchContainer.empty();
  res.items.forEach(result => {
    let id = result.id.videoId;
    let name = result.snippet.title;
    // TODO let contributor = currentUser();
    let liStr = `<li class="song-search-result" id="${id}">${name}</li>`;
    searchContainer.append(liStr);
    let li = $('.song-search-results li').last();
    li.click(e => {
      if(selectedSearchResultId){
        $(`#${selectedSearchResultId}`).removeClass('selectedSearchResult');
      }
      selectedSearchResultId = e.target.id;
      e.target.className += ' selectedSearchResult';
      // embed player for current song
      // TODO move to displaySongs when we retool DB to handle just video ids and not urls
      if(player) {
        player.loadVideoById(selectedSearchResultId);
      } else {
        player = new YT.Player('song-embed', {
          height: '390',
          width: '640',
          videoId: selectedSearchResultId,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    });
  });
}


function queryString(obj) {
  let str = '?';
  for(key in obj) {
    let value = obj[key].replace(' ', '+');
    str += `${key}=${value}&`;
  }
  return str.substring(0, str.length-1);
}
