module.exports = {
  home: function(req, res) {
    res.render('index');
  },

  Playlists: require('./playlists'),
  Songs: require('./songs'),
};
