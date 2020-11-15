/**
* Ha a user azonosítva van, akkor next hívás, különben redirecteli a / -re.
* */

const renderMW = require("../renderMW");

module.exports = function(objectrepository) {
    return function(req, res, next) {
            if(typeof req.session.loggedIn === 'undefined' && req.session.loggedIn !== true) {
                return res.redirect('/');
            }
            return next();
    };
};