var router = require('express').Router();
var User = require('../models/user');
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
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({ email: req.body.email }, function(err, existingUser) {

    if (existingUser) {
      req.flash('errors', 'Account with that email address already exists');

      return res.redirect('/signup');
    } else {
      user.save(function(err, user) {
        if (err) return next(err);

        return res.redirect('/');
      });
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
