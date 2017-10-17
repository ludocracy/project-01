const mongoose = require('mongoose');
const db = require('./models');

var testSong1 = new db.Song ({
  youTubeHash: "https://www.youtube.com/watch?v=28tZ-S1LFok"
});

var testSong2 = new db.Song ({
  youTubeHash: "https://www.youtube.com/watch?v=auzfTPp4moA"
});

var testPlaylist1 = new db.Playlist ({
  name: "testPlaylist1",
  description: "this is a seed playlist!"
});

var testPlaylist2 = new db.Playlist ({
  name: "testPlaylist2",
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
              testPlaylist1.songs.push(testSong1);
              testPlaylist1.songs.push(testSong2);
              testPlaylist1.save(function(err, savedPlaylist1){
                if (err) {
                  console.log(err);
                } else {
                  testPlaylist2.save(function (err, savedPlaylist2) {
                    testUser.playlists.push(testPlaylist1);
                    testUser.playlists.push(testPlaylist2);
                    testUser.save(function(err, savedUser) {
                      if(err) {
                        console.log(err);
                      } else {
                        console.log('success! ', savedUser);

                        process.exit();
                      }
                    });
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
