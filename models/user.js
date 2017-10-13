const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String,
    required: true,
    unique: true },
  // email: String,
  passwordHash: { type: String, required: true },
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
  }]
});

module.exports = mongoose.model('User', UserSchema);
