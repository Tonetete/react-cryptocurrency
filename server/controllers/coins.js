const User = require('../models/user'),
      CoinsUser = require('../models/coinsUser');

exports.getCoinsUser = (req, res, next) => {
    const user = req.decoded.email;
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