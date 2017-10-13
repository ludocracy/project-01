const mongoose = require('mongoose');
const db = require('./models');

// var testUser = new db.User ({
//   name: "testUser",
//   passwordHash: "password",
//   playlist: [testPlaylist]
// })

var testSong1 = new db.Song ({
  youTubeHash: "https://www.youtube.com/watch?v=28tZ-S1LFok"
});

var testSong2 = new db.Song ({
  youTubeHash: "https://www.youtube.com/watch?v=auzfTPp4moA"
});

var testPlaylist = new db.Playlist ({
  name: "testPlaylist",
  description: "this is a seed playlist!",
  songs: [testSong1, testSong2]
});

// testUser.save(function(err, savedUser){
//   if (err) {
//     console.log('error saving user');
//   } else {
//     console.log('user save success');
//   }
// });


testSong1.save(function(err, savedSong){
  if (err) {
    console.log('error saving song');
  } else {
    console.log('song save success', savedSong);
  }
});

testSong2.save(function(err, savedSong){
  if (err) {
    console.log('error saving song');
  } else {
    console.log('song save success', savedSong);
  }
});

testPlaylist.save(function(err, savedPlaylist){
  if (err) {
    console.log('error saving playlist');
  } else {
    console.log('playlist save success', savedPlaylist);
  }
});
