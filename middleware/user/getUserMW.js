/**
* Betölt egy adoot user-t az adatbázisból.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        
        UserModel.findOne({_id: req.params.userid}, (err, user) => {
            if(err || !user) {
                return next(err);
            }
            res.locals.user = user;
            return next();
        });
    };
};
