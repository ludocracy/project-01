const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String, required: true },
  youTubeHash: { type: String, required: true }
});

module.exports = mongoose.model('Song', SongSchema);
