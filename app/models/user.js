var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

User.prototype.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.password = hash;
        next();
      });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
