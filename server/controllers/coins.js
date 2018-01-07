const User = require('../models/user'),
      CoinsUser = require('../models/coinsUser');
// import Cookies from 'js-cookie'

// function checkTokenUser () {
//     const token = Cookies.get('token')

//     if (token) {
//     // Update application state. User has token and is probably authenticated
//     store.dispatch({ type: AUTH_USER })
//     }
// }


exports.getCoinsUser = (req, res, next) => {
    const user = req.decoded.email;
    // const password = 
    // res.status(200).json({ response: req.cookies });
    User.findOne({ email: user }, (err, existingUser) => { 
        if (err) {
          return next(err);
        } 
        
        if (existingUser) {
            CoinsUser.findOne({ userId: existingUser._id }, (errCoinsUser, coinsUser) => {
              if (errCoinsUser) {
                return next(err);
              }

              if (coinsUser) {
                return res.status(201).json({ coins: coinsUser.coins });
              } 
            })
        }
    });
} 