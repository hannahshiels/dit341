const passport = require('passport');
require('../config/passport')

const login = (req,res,next) => {
    passport.authenticate('local', function (err, user, info) {
        if(err){
          return next(err);
        }

        if(!user){
          return res.status(400).json({"message": "Cannot find user with that email."})
        }

        req.login(user, err => {
          res.status(200).json({"id": user._id })
        })

      })(req, res,next);
}

const logOut = (req,res,next) => {
    req.logout();
    res.json({
        "message": 'Logged out.'
    });
}

module.exports = { login, logOut }