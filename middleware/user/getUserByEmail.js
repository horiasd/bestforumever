/**
* Betölt egy adoot user-t az adatbázisból.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        
        if(typeof req.body.email === 'undefined') {
            return next();
        }
        UserModel.findOne({email: req.params.email}, (err, user) => {
            if(err) {
                return next(err);
            }
            if(!user) {
                res.locals.error = 'There\'s no user with this email address.';
                return next();
            }
            res.locals.user = user;
            return next();
        });
    };
};
