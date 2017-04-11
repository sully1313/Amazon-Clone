var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');


var User = require('./models/user');

var app = express();

// MongoLab DB Connection
mongoose.connect('mongodb://root:abc123@ds159180.mlab.com:59180/amazon13', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);



// Server listening on port 3000
app.listen(3000, function(err) {
  if (err) throw err;
  console.log("Server is Running on port 3000");
});
