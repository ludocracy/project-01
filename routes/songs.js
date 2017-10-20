const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');
const express = require('express');
const app = express();
require('dotenv').config();

// set up sockets!!!
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: process.env.SOCKET_PORT });

// posts 'update' to all clients, prompting them to get the latest songs
function broadcastUpdate() {
  wss.clients.forEach(function each(client) {
    console.log('broadcasting!');
    client.send("update");
  });
}

//Retrieves all songs in playlist and returns them in a JSON object
function getAllSongs(req, res){
  db.Playlist.findById(req.params.id)
  .populate('songs').exec(function(err, foundPlaylist){
    if(err){
      console.log('Error finding this playlist.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(foundPlaylist.songs);
    }
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
        title: req.body.title,
        youTubeHash: req.body.youTubeHash,
      });
      newSong.save(function(err, data){
        if(err){
          console.log('Error saving song to playlist', err);
          res.status(500).send('Internal server error.');
        }else{
          //adds songs to playlist then saves the playlist
          playlist.songs.push(newSong);
          playlist.save(function(err, savedPlaylist){
            if(err){
              console.log('Error saving playlist to database.');
              res.status(500).send('Internal server error.');
            }else{
              broadcastUpdate(); // let all clients know there's a new song
              res.json(newSong);
            }
          });
        }
      });
    };
  });
};

//deletes a song by its ID in the playlist referenced in the parameter
function deleteSong(req, res){
  db.Playlist.findById(req.params.pid, function(err, foundPlaylist){
    db.Song.findByIdAndRemove(req.params.sid, function(err, song){
      if(err){
        console.log('Error finding song in playlist.', err);
        res.status(500).send('Internal server error.');
      }else{
        let deadIdIndex = foundPlaylist.songs.indexOf(req.params.sid);
        foundPlaylist.songs.splice(deadIdIndex, 1);
        foundPlaylist.save(function(err, data){
          if(err){
            console.log('Error saving playlist after deleting song.', err);
            res.status(500).send('Internal server error.');
          }else{
            broadcastUpdate(); // let all clients know a song was deleted
            res.json({});
          }
        });
      }
    });
  });
}

module.exports = {
  getAllSongs: getAllSongs,
  createSong: createSong,
  deleteSong: deleteSong
};
