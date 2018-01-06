const AuthenticationController = require('./controllers/authentication'),  
      CoinsController = require('./controllers/coins')
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');


// Constants for role types
const REQUIRE_ADMIN = "Admin",  
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });        

module.exports = function(app) {  
    // Initializing route groups
    const apiRoutes = express.Router(),
          authRoutes = express.Router(),
          coinRoutes = express.Router();
    
    //=========================
    // Auth Routes
    //=========================
  
    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);
  
    // Registration route
    authRoutes.post('/register', AuthenticationController.register);
  
    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    // Set coin routes
    apiRoutes.use('/coins', coinRoutes);

    // Get user coins
    coinRoutes.post('/getCoinsUser', CoinsController.getCoinsUser);
  
  // Set url for API group routes
    app.use('/api', apiRoutes);
};