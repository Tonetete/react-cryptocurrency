// Importing Node modules and initializing Express
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      config = require('./config/main'),
      router = require('./router'),
      passport = require('passport'),
      cookieParser = require('cookie-parser');

      // Database Connection
mongoose.connect(config.database);  

const server = app.listen(config.port);
console.log('Your server is running on port ', config.port, ' .');

app.set('superSecret', config.secret); // secret variable
// Setting up basic middleware for all Express requests
// Log requests to API using morgan
app.use(logger('dev')); 
// Initialize passport for use
app.use(passport.initialize());
// parse urlencoded bodies to JSON 
app.use(bodyParser.urlencoded({ extended: false }));  
// expose the object in req.body when we start building endpoints.
app.use(bodyParser.json());  
// Parse cookies
app.use(cookieParser());
// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }
});

router(app);