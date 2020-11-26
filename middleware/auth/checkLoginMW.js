/**
* Ellenőrzi a POST-ban kapott paramétereket (email, password), ha jót adott meg a user,
* akkor egy sessiont készítek a usernek és redirectelem a /-re.
* */

const requireOption = require("../requireOptions");

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {

        if(typeof req.body.password === 'undefined' 
        || req.body.username === '' 
        || req.body.password === '') {
            return next();
        }

        UserModel.findOne({email: req.body.email}, (err,user) => {
            if(err) {
                return next(err);
            }
            if(!user) {
                res.locals.error = 'There\'s no user with this email address.';
                return next();
            }
            const bcrypt = require('bcrypt');
            if(bcrypt.compareSync(req.body.password, user.password)) {
                req.session.loggedIn = true;
                req.session.userId = user._id;
                req.session.username = user.username;
                return req.session.save((err)=> {
                    if(err) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            }
            else {
                res.locals.error = 'Wrong password';
                return next();
            }
        });
    };
};