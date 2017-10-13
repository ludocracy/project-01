module.exports = {
  home: function(req, res) {
    res.send('welcome to kollaboscope!');
  },
  
  Users: require('./users'),
  Playlists: require('./playlists'),
  Songs: require('./songs'),
};
