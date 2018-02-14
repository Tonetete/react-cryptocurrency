/*
 To learn more about this section code, visit:
  http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/
* */


// Importing Passport, strategies, and config
const passport = require('passport'),  
      User = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

// We tell passport to not use 'username' default field but 'email' instead.
const localOptions = { usernameField: 'email' };        

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
    User.findOne({ email: email }, function(err, user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false, { error: 'Your login details could not be verified. User not exists.' }); }
  
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Password is incorrect." }); }
  
        return done(null, user);
      });
    });
  });

// allow passport to use the strategies we defined  
passport.use(localLogin);
