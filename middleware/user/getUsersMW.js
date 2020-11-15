/**
* Lekéri az összes felhasználót az adatbázisból.
* */

const requireOption = require("../requireOptions");

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        
        if(req.session.username !== 'admin') {
            return res.redirect('/');
        } 

        UserModel.find({}, (err, users) => {
            if(err) {
                return next(err);
            }
            res.locals.users = users;
            return next();
        });
    };
};