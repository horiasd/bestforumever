/**
* POST paraméterekben lévő információk alapján új user-t hoz létre.
* Redirectel a / - re.
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
        if(res.locals.password === res.locals.passwordagain){
            res.locals.user = new UserModel();
            res.locals.user.email = req.body.email;
            res.locals.user.username = req.body.username;

            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);

            res.locals.user.password = hash;

            res.locals.user.save( (err)=> {
                if(err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        }
        else{
            res.locals.error = 'Password\'s didnt match';
            res.redirect('/signup')
            return next();
        }
        
    };
};