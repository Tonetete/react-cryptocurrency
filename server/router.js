const AuthenticationController = require('./controllers/authentication'),  
      CoinsController = require('./controllers/coins')
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      jwt = require('jsonwebtoken');


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
    

    // route middleware to verify a token
    const verifyToken = (req, res, next) => {
      // check header or url parameters or post parameters for token   
      const token = req.headers.authorization;
      // decode token
      if (token) {
         jwt.verify(token, app.get('superSecret'), (err, decoded) => {
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              next();    
            }
         });
      } else {
         // if there is no token
         // return an error
         return res.status(403).send({
            success: false,
            message: 'No token provided.'   
         })   
      }
   };
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
    coinRoutes.use(verifyToken)
    // Get user coins
    coinRoutes.post('/getCoinsUser', CoinsController.getCoinsUser);
  
  // Set url for API group routes
    app.use('/api', apiRoutes);
};