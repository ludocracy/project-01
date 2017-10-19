$(document).ready(function(){
  $('#initialPlaylistForm').click(postPlaylist);

  // note: we need this for admin page
  // getAllPlaylists();
});

function postPlaylist(e) {
  e.preventDefault();
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
  window.location.replace(`/${res._id}`);
}
