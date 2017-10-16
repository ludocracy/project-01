// DEPENDENCIES
const express = require('express'),
  bodyParser = require('body-parser'),
  Routes = require('./routes'),
  app = express();

// ENVIRONMENT
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// APP SETUP
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json());

// ROUTES
// TODO double commented routes are for 'extra' features
// TODO single commented routes should be uncommented once callbacks are created
app.get('/', Routes.home);

app.get('/users', Routes.Users.getAllUsers);
app.get('/users/:id', Routes.Users.getOneUser);
app.post('/users', Routes.Users.createUser);
app.get('/users/:id/playlists', Routes.Users.getAllPlaylists);
app.post('/users/:id/playlists', Routes.Users.createPlaylist);
// //
app.post('/playlists', Routes.Playlists.createPlaylist);
app.get('/playlists/:id', Routes.Playlists.getOnePlaylist);
// // app.get('/playlists/:id/users', Routes.Playlists.getAllUsers);
app.put('/playlists/:id', Routes.Playlists.updatePlaylist);
app.delete('/playlists/:id', Routes.Playlists.deletePlaylist);
//
app.get('/playlists/:id/songs', Routes.Songs.getAllSongs);
app.post('/playlists/:id/songs', Routes.Songs.createSong);
app.delete('/playlists/:pid/songs/:sid', Routes.Songs.deleteSong);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
