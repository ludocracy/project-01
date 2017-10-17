const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

//Retrieves a playlist and returns them in a JSON object
function getOnePlaylist(req, res){
  db.Playlist.findById(req.params.id, function(err, data){
    if(err){
      console.log('Error retrieving this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    };
  });
};


//Retrieves the contributors to a playlist TODO: INTEGRATE USERS TO PLAYLIST SCHEMA
function getAllContributors(req, res){
  db.Playlist.findById(req.params.id, function(err, data){
    if(err){
      console.log('Error retrieving the constributors of this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.status(201).json(data.users);
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

//Deletes playlist TODO: REMOVE REFERENCES TO PLAYLIST IN USERS' ARRAYS
function deletePlaylist(req, res){
  var playlistName;
  db.Playlist.findOneAndRemove(req.params.id, function(err, data){
    if(err){
      console.log('Error deleting this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json({});
    };
  });
};

module.exports = {
  getAllContributors: getAllContributors,
  getOnePlaylist: getOnePlaylist,
  deletePlaylist: deletePlaylist,
  updatePlaylist: updatePlaylist
};
