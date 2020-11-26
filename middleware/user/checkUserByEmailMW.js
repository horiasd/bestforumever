/**
* Megnézi van e adott email címmel rendelkező user. 
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
        UserModel.findOne( {email: req.body.email}, (err, emailRes) => {
            if(err || !emailRes) {
                return next(err);
            }
            res.locals.emailExists = emailRes;
            return next();
        });
        
        
    };
};