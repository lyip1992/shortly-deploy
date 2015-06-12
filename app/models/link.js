var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

var createHash = function(){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function (next){
  var code = createHash(this.url);
  this.code = code;
  next();
});

var Link = mongoose.model('User', linkSchema);

module.exports = Link;
