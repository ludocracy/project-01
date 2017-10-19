module.exports = {
  home: function(req, res) {
    res.render('index');
  },

  test: function(req, res) {
    res.render('playlist');
  },


  Users: require('./users'),
  Playlists: require('./playlists'),
  Songs: require('./songs'),
};
