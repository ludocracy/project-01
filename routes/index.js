module.exports = {
  home: function(req, res) {
    res.render('index');
  },

  Users: require('./users'),
  Playlists: require('./playlists'),
  Songs: require('./songs'),
};
