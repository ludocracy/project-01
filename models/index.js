const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.openUri(process.env.MONGODB_URI, (err, conn) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

module.exports = {
  Playlist: require('./playlist'),
  Song: require('./song'),
}
