/**
* Megnézi van e adott usernama-el rendelkező user.
* */
const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        if(typeof req.body.username === 'undefined' || 
            req.body.email === 'undefined' || 
            req.body.password === 'undefined' || 
            req.body.passwordagain === 'undefined') {
                return next();
        }
        UserModel.findOne( {username: req.body.username}, (err, usernameRes) => {
            if(err || !usernameRes) {
                return next(err);
            }
            res.locals.usernameExists = usernameRes;
            return next();
        });
        
        
    };
};