const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

//Retrieves all songs in playlist and returns them in a JSON object
function getAllSongs(req, res){
  db.Playlist.findById(req.params.id)
  .populate('songs').exec(function(err, foundPlaylist){
    res.json(foundPlaylist.songs);
  })
};

//adds a song to the playlist referenced in the parameter
function createSong(req, res){
  db.Playlist.findById(req.params.id, function(err, playlist){
    if(err){
      console.log('Error adding this song to playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      const newSong = db.Song({
        youTubeHash: req.body.youTubeHash,
        // user: req.body.user
      })

      //adds songs to playlist
      playlist.songs.push(newSong)

      newSong.save(function(err, song){
        if(err){
          console.log('Error saving song model to playlist.', err);
          res.status(500).send('Internal server error.');
        }else{
          res.status(201).json(song);
        }
      })
      data.songs.push(newSong);
    };
  });
};

//deletes a song by its ID in the playlist referenced in the parameter
function deleteSong(req, res){
  db.Playlist.findById(req.paramas.pid, function(err, data){
    data.songs.findByIdAndRemove(req.params.sid, function(err, song){
      if(err){
        console.log('Error finding this song in playlist.', err);
        res.status(500).send('Internal server error.');
      }else{
        data.songs.save();
        res.status(201).send('Song was successfully removed from playlist.');
      };
    });
  });
};

module.exports = {
  getAllSongs: getAllSongs,
  createSong: createSong,
  deleteSong: deleteSong
};
