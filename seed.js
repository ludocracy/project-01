const mongoose = require('mongoose');
const db = require('./models');

var testSong1 = new db.Song ({
  youTubeHash: "https://www.youtube.com/watch?v=28tZ-S1LFok"
});

var testSong2 = new db.Song ({
  youTubeHash: "https://www.youtube.com/watch?v=auzfTPp4moA"
});

var testPlaylist = new db.Playlist ({
  name: "testPlaylist",
  description: "this is a seed playlist!"
});

var testUser = new db.User ({
  name: "testUser",
  passwordHash: "password"
});


db.User.remove({}, () => {
  db.Playlist.remove({}, () => {
    db.Song.remove({}, () => {
      testSong1.save(function(err, savedSong1){
        if (err) {
          console.log(err);
        } else {
          testSong2.save(function(err, savedSong2){
            if (err) {
              console.log(err);
            } else {
              testPlaylist.songs.push(testSong1);
              testPlaylist.songs.push(testSong2);
              testPlaylist.save(function(err, savedPlaylist){
                if (err) {
                  console.log(err);
                } else {
                  testUser.playlists.push(testPlaylist);
                  testUser.save(function(err, savedUser) {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log('success! ', savedUser);

                      process.exit();
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
});
