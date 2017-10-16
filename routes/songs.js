const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

//Retrieves all songs in playlist and returns them in a JSON object
function getAllSongs(req, res){
  db.Song.find({}, function(err, data){
    if(err){
      console.log('Error retrieving this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.status(201).json(data);
    };
  });
};

module.exports = {
  getAllSongs: getAllSongs
};
