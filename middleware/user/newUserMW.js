/**
* POST paraméterekben lévő információk alapján új user-t hoz létre.
* Redirectel a / - re.
* */
const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        if(typeof req.body.username === 'undefined' || req.body.username === '' ||
            typeof req.body.email === 'undefined' || req.body.email === '' || 
            typeof req.body.password === 'undefined' || req.body.password === '' || 
            typeof req.body.passwordagain === 'undefined' || req.body.passwordagain === '') {
                return next();
        }
        
        if(typeof res.locals.emailExists !== 'undefined' && typeof res.locals.usernameExists !== 'undefined') {
            res.locals.error = 'There\' a user with this email address & username.';
            return next();
        }
        if(typeof res.locals.emailExists !== 'undefined') {
            res.locals.error ='There\'s a user with this email address.';
            return next();
        }
        if(typeof res.locals.usernameExists !== 'undefined') {
            res.locals.error ='There\'s a user with this username.';
            return next();
        }
        
        if(req.body.password === req.body.passwordagain){
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
            return next();
        }
        
    };
};