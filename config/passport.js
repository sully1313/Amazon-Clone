var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy();

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



// Passport Middleware
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({ email: email}, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops wrong password pal'));
    }
    return done(null, user);
  });
}));


// custom function to validate
