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
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// ROUTES

app.get('/', Routes.home);

//test
app.get('/test', Routes.test);

app.get('/signup', Routes.Users.getSignupPage);
app.get('/login', Routes.Users.getLoginPage);
app.post('/sessions', Routes.Users.newLoginSession);

app.get('/users', Routes.Users.getAllUsers);
app.get('/users/:id', Routes.Users.getOneUser);
app.put('/users/:id', Routes.Users.updateUser);
app.post('/users', Routes.Users.createUser);
app.get('/users/:id/playlists', Routes.Users.getAllPlaylists);
app.post('/users/:id/playlists', Routes.Users.createPlaylist);

app.get('/playlists/:id', Routes.Playlists.getOnePlaylist);
app.get('/playlists/:id/users', Routes.Playlists.getAllContributors);
app.put('/playlists/:id', Routes.Playlists.updatePlaylist);
app.delete('/playlists/:id', Routes.Playlists.deletePlaylist);

app.get('/playlists/:id/songs', Routes.Songs.getAllSongs);
app.post('/playlists/:id/songs', Routes.Songs.createSong);
app.delete('/playlists/:pid/songs/:sid', Routes.Songs.deleteSong);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
