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

module.exports = function(app) {  
    // Initializing route groups
    const apiRoutes = express.Router(),
          authRoutes = express.Router(),
          coinRoutes = express.Router();

    // Middleware to require login/auth. We use localStrategy with passport.authenticate('local')
    // so we use our strategy imported in 'passportService' above.
    // Passing callback function with 'err', 'user' & 'info' returned from localStrategy login
    // so we can return the necessary info to user to notify errors.

    const requireAuth = passport.authenticate('jwt', { session: false });  
    const requireLogin = function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(500).json({ error: err }); }
        if (!user) { return res.status(401).json({ error: info.error }); }
        req.user = user;
        next();
      })(req, res, next);
    }
    
    // route middleware to verify a token
    const verifyToken = (req, res, next) => {
      // check header or url parameters or post parameters for token   
      const token = req.headers.authorization;
      // decode token
      if (token) {
         jwt.verify(token, app.get('superSecret'), (err, decoded) => {
            if (err) {
              return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
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
    coinRoutes.use(verifyToken);
    // Get user coins
    coinRoutes.post('/getCoinsUser', CoinsController.getCoinsUser);
  
    // Set url for API group routes
    app.use('/api', apiRoutes);
};
