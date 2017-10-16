const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  SongSchema = require('./song');

const PlaylistSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }],
  // contributors to the playlist
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
