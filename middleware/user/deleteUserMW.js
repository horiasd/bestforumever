/**
* Eltávolít egy user-t az adatbázisból.
* Redirectel a /admin-ra.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        if(res.locals.user === 'undefined') {
            return next();
        }
        res.locals.user.remove((err) => {
            if(err) {
                return next(err);
            }
            return res.redirect('/admin');
        });
    };
};