
const jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      User = require('../models/user'),
      CoinsUser = require('../models/coinsUser'),
      config = require('../config/main');

function generateToken(user) {  
  return jwt.sign(user, config.secret, {
    expiresIn : '120m'
  });
} 

// Set user info from request
function setUserInfo(request) {  
    return {
      _id: request._id,
      firstName: request.profile.firstName,
      lastName: request.profile.lastName,
      email: request.email,
      role: request.role,
    };
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

    let userInfo = setUserInfo(req.user);
    res.status(200).json({
      token: generateToken(userInfo),
      user: userInfo
    });
}
  
  
  //========================================
  // Registration Route
  //========================================
  exports.register = function(req, res, next) {  
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
  
    // Return error if no email provided
    if (!email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }
  
    // Return error if full name not provided
    if (!firstName || !lastName) {
      return res.status(422).send({ error: 'You must enter your full name.'});
    }
  
    // Return error if no password provided
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }
  
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }
  
        // If user is not unique, return error
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
        }
  
        // If email is unique and password was provided, create account
        let user = new User({
          email: email,
          password: password,
          profile: { firstName: firstName, lastName: lastName }
        });
  
        user.save(function(err, user) {
          if (err) { return next(err); }
    
          let userInfo = setUserInfo(user);
          
          // When user is created, so create his coins table

          let coinsUser = new CoinsUser({
            userId: user._id
          });
          coinsUser.save((err, cUser) => {
            if (err) { return next(err); }
          });

          res.status(201).json({
            token: generateToken(userInfo),
            user: userInfo
          });
        });
    });
}

//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {  
    return function(req, res, next) {
      const user = req.user;
      User.findById(user._id, function(err, foundUser) {
        if (err) {
          res.status(422).json({ error: 'No user was found.' });
          return next(err);
        }
  
        // If user is found, check role.
        if (foundUser.role == role) {
          return next();
        }
  
        res.status(401).json({ error: 'You are not authorized to view this content.' });
        return next('Unauthorized');
      })
    }
}
  