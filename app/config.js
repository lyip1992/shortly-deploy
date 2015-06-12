var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection is now open');
});

module.exports = db;
