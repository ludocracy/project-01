// DEPENDENCIES
const express = require('express'),
  bodyParser = require('body-parser'),
  Routes = require('./routes'),
  app = express(),
  morgan = require('morgan'),
  server = require('http').createServer(),
  WebSocketServer = require('ws').Server;

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
app.get('/:id', Routes.playlist);

app.get('/playlists/:id/songs', Routes.Songs.getAllSongs);
app.post('/playlists/:id/songs', Routes.Songs.createSong, broadcastUpdate);
app.delete('/playlists/:pid/songs/:sid', Routes.Songs.deleteSong);

// set up connection between api server and socket server
const wss = new WebSocketServer({ server: server });
server.on('request', app);

// posts 'update' to all clients, prompting them to get the latest songs
function broadcastUpdate(req, res, next) {
  wss.clients.forEach(function each(client) { // iterating through all clients to notify
    client.send("update");
  });
  next();
}

// START SERVER
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
