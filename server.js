const app = require('express')(),
  bodyParser = require('body-parser'),
  Routes = require('./routes');

require('dotenv').config();

const PORT = process.env.PORT;

//
app.get('/', (req, res) => {
  res.send('welcome to kollaboscope!');
})

// app.get('/users')
// app.get('/users/:id', Routes.Users.getUser);
// app.post('/users', Routes.Users.createUser);
// app.get('/users/:id/playlists', Routes.Users.getPlaylists);
// app.post('/users/:id/playlists', Routes.Users.createPlaylist);
//
// app.get('/playlists/:id', Routes.Playlists.getPlaylist);
// app.get('/playlists/:id/users', Routes.Playlists.get);
// app.put('/playlists/:id');
// app.delete('/playlists/:id');

app.post('/playlists/:id/songs', () => {})
app.delete('/playlists/:pid/songs/:sid', () => {})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
