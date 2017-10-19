const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');


//Retrieves an array of playlists
// TODO may not need this?
function getAllPlaylists(req, res){
  db.Playlist.find({}, (err, foundPlaylists) => {
    if(err){
      console.log('Error retrieving playlists', err);
    } else {
      res.json(foundPlaylists);
    }
  });
};

//Creates a playlist
function createPlaylist(req, res){
  const newPlaylist = db.Playlist({
    name: req.body.name,
    description: req.body.description,
    songs: req.body.songs,
  });
  newPlaylist.save(function(err, playlist){
    if(err) {
      console.log('Error creating playlist', err);
      res.status(500).send('Internal Server Error.');
    } else {
      res.json(playlist);
    };
  });
};

//Retrieves a playlist and returns them in a JSON object
function getOnePlaylist(req, res){
  db.Playlist.findById(req.params.id)
  .populate('songs').exec(function(err, data){
    if(err){
      console.log('Error retrieving this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    };
  });
};

//Updates playlist with a new song
function updatePlaylist(req, res){
  db.Playlist.findById(req.params.id, function(err, data){
    if(err){
      console.log('Error updating this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      data.name = req.body.name || data.name;
      data.description = req.body.description || data.description;
      data.save(function(err, savedData){
        res.json(savedData);
      });
    };
  });
};

//Deletes playlist
function deletePlaylist(req, res){
  db.Playlist.findByIdAndRemove(req.params.id, function(err, playlistDeleted){
    if(err){
      console.log('Error deleting this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json({});
    };
  });
};

module.exports = {
  getAllPlaylists: getAllPlaylists,
  createPlaylist: createPlaylist,
  getOnePlaylist: getOnePlaylist,
  deletePlaylist: deletePlaylist,
  updatePlaylist: updatePlaylist
};
