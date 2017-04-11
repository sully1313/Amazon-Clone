var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://root:abc123@ds159180.mlab.com:59180/amazon13', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(morgan('dev'));


app.get('/', function(req, res) {
  var name = "Matt";
  res.json('My name is ' + name);
});

app.listen(3000, function(err) {
  if (err) throw err;
  console.log("Server is Running on port 3000");
});
