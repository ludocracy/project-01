// DEPENDENCIES
const express = require('express'),
  bodyParser = require('body-parser'),
  Routes = require('./routes'),
  app = express(),
  morgan = require('morgan');

// ENVIRONMENT
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// APP SETUP
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// ROUTES

app.get('/', Routes.home);

app.get('/playlists', Routes.Playlists.getAllPlaylists);
app.post('/playlists', Routes.Playlists.createPlaylist);
app.put('/playlists/:id', Routes.Playlists.updatePlaylist);
app.delete('/playlists/:id', Routes.Playlists.deletePlaylist);

app.get('/playlists/:id', Routes.Playlists.getOnePlaylist);
// when playlist is created, redirect to created playlist page
app.get('/:id', Routes.playlist);

app.get('/playlists/:id/songs', Routes.Songs.getAllSongs);
app.post('/playlists/:id/songs', Routes.Songs.createSong);
app.delete('/playlists/:pid/songs/:sid', Routes.Songs.deleteSong);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
