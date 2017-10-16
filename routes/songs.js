const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

//Retrieves all songs in playlist and returns them in a JSON object
function getAllSongs(req, res){
  db.Playlist.find({}, function(err, data){
    if(err){
      console.log('Error retrieving this playlist\'s songs.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.status(201).json(data);
    };
  });
};

function createSong(req, res){
  db.Playlist.findById(req.params.id, function(err, data){
    if(err){
      console.log('Error adding this song to playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      const newSong = db.Song({
        //user: req.body.user,
        youTubeHash: req.body.youTubeHash
      })
      newSong.save(function(err, song){
        if(err){
          console.log('Error saving song model to playlist.', err);
          res.status(500).send('Internal server error.');
        }else{
          res.status(201).json(song);
        }
      })
      data.songs.push(newSong);
    }
  });
};

module.exports = {
  getAllSongs: getAllSongs,
  createSong: createSong
};
