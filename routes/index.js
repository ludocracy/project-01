const path = require('path');

module.exports = {
  home: function(req, res) {
    res.sendFile('index');
  },

  playlist: function(req, res) {
    console.log('trying to send: ', __dirname+'/../public/playlist.html');
    res.sendFile(path.join(__dirname, '/../public/playlist.html'));
  },

  Playlists: require('./playlists'),
  Songs: require('./songs'),
};
