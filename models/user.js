const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { type: String,
    required: true,
    unique: true },
  email: String,
  passwordHash: { type: String, required: true },
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
  }]
});

UserSchema.statics.createSecure = function(name, email, password, callback) {
  const UserModel = this;

  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function(err, hash){
      UserModel.create({
        name: name,
        email: email,
        passwordHash: hash
      }, callback);
    });
  });
};
UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
};

UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({email: email}, function(err, foundUser){
    if (!foundUser) {
      callback(new Error(`i couldn\'t find the user with email: ${email}`));
    } else {
      foundUser.checkPassword(password, function(err, passwordsMatch) {
        if (err || !passwordsMatch) {
          callback(new Error('password did not match', null));
        } else {
          callback(null, foundUser);
        }
      });
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
