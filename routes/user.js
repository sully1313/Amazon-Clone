var router = require('express').Router();
var User = require('../models/user');
var Cart = require('../models/cart');
var async = require('async');
var passport = require('passport');
var passportConf = require('../config/passport');

// profile get route
router.get('/profile', function(req, res, next) {
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) return next(err);
    res.render('accounts/profile', { user: user });
  });
});

// login get route
router.get('/login', function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', { message: req.flash('loginMessage')});
});

// login post route
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

// signup get route
router.get('/signup', function(req, res, next) {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

// signup User post Route
router.post('/signup',function(req, res, next) {

  async.waterfall([
    function(callback) {
      var user = new User();

      user.profile.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;
      user.profile.picture = user.gravatar();

      User.findOne({ email: req.body.email }, function(err, existingUser) {

        if (existingUser) {
          req.flash('errors', 'Account with that email address already exists');

          return res.redirect('/signup');
        } else {
          user.save(function(err, user) {
            if (err) return next(err);
            callback(null, user);

          });
        }
      });
    },

    function(user) {
      var cart = new Cart();
      cart.owner = user._id;
      cart.save(function(err) {
        if (err) return next(err);
        req.logIn(user, function(err) {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    }
  ]);
});

// logout get route
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// edit-profile get route
router.get('/edit-profile', function(req, res, next) {
  res.render('accounts/edit-profile', { message: req.flash('success')});
});

//edit-profile post route
router.post('/edit-profile', function(req, res, next) {
  User.findOne({ _id: req.user._id }, function(err, user) {

    if (err) return next(err);

    if (req.body.name) user.profile.name = req.body.name;
    if (req.body.address) user.address = req.body.address;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Successfully Updated!');
      return res.redirect('/profile');
    });
  });
});
module.exports = router;
