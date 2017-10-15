const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

function getOnePlaylist(req, res){
  db.Playlist.findById(req.params.id, function(err, data){
    if(err){
      console.log('Error retrieving this user.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    }
  })
}
