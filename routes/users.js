const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

//Retrieves all users and returns them in a JSON object
function getAllUsers(req, res){
  db.find({}, function (err, data){
    if(err){
      console.log('Error retrieving all users.', err);
      res.status(500).send('Internal server error.')
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
      res.status(500).send('Internal server error.')
    }else{
      res.json(data);
    };
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  getOneUser: getOneUser
};
