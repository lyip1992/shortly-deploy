var mongoose = require('mongoose');
var path = require('path');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  var urlSchema = new mongoose.Schema({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number
  });

  var Url = mongoose.model('Url', urlSchema);

  var userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

  var User = mongoose.model('User', userSchema);
});

mongoose.connect('mongodb://localhost/test');
