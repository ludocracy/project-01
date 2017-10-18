const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

function getSignupPage(req, res) {
  res.render('signup');
}

function getLoginPage(req, res) {
  res.render('login');
}

function newLoginSession(req, res) {
  db.User.authenticate(req.body.email, req.body.passwordHash, function(err, user){
    if (err) {
      res.status(400).send(`Error processing login: ${err.message}`);
    } else {
      res.json(user);
    }
  });

}

//Creates a user and returns new user as a JSON object
function createUser(req, res){
  db.User.createSecure(req.body.name, req.body.email, req.body.passwordHash, function(err, savedUser) {
    if (err) {
      res.status(500).send('something went wrong.');
    } else {
      res.json(savedUser);
    }
  });
};

//Updates a user
function updateUser(req, res){
  db.User.findById(req.params.id, function(err, foundUser){
    if(err){
      console.log('Error finding user.', err);
      res.status(500).send('Internal server error.');
    }else{
      foundUser.name = req.body.name || foundUser.name,
      foundUser.email = req.body.email || foundUser.email
    }
    foundUser.save(function(err, data){
      if(err){
        console.log('Error saving user data.', err);
        res.status(500).send('Internal server error.');
      }else{
        res.json(data);
      };
    });
  });
};

//Retrieves all users and returns them in a JSON object
function getAllUsers(req, res){
  db.User.find({}, function (err, data){
    if(err){
      console.log('Error retrieving all users.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    };
  });
};

//Retrieves a user and returns them in a JSON object
function getOneUser(req, res){
  db.User.find(req.params.id, function(err,data){
    if(err){
      console.log('Error retrieving this user.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    };
  });
};

//Retrieves an array of user's playlists
function getAllPlaylists(req, res){
  db.User.findById(req.params.id)
  .populate('playlists').exec(function(err, foundUser){
    res.json(foundUser.playlists);
  })
};

//Creates a playlist with 'this' user as a contributor
function createPlaylist(req, res){
  db.User.findById(req.params.id, function(err, user){
    if(err){
      console.log('Error retrieving user', err);
      res.status(500).send('Internal Server Error.');
    }else{
      const newPlaylist = db.Playlist({
        name: req.body.name,
        description: req.body.description,
        songs: req.body.songs,
      });

      //adds user to playlist array
      newPlaylist.users.push(user);
      //adds newPlaylist to user's playlists
      user.playlists.push(newPlaylist);
      user.save();
      newPlaylist.save()//(function(err, playlist){
      //   if(err){
      //     console.log('Error retrieving user', err);
      //     res.status(500).send('Internal Server Error.');
      //   }else{
      //     res.status(201).send(`Created ${req.body.name} successfully`);
      //   };
      // });
      res.json(newPlaylist);
    };
  });
};

module.exports = {
  getSignupPage: getSignupPage,
  getLoginPage: getLoginPage,
  newLoginSession: newLoginSession,
  updateUser: updateUser,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  createUser: createUser,
  getAllPlaylists: getAllPlaylists,
  createPlaylist: createPlaylist
};
