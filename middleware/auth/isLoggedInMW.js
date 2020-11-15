/**
* Megfeleő header file includeolásához kell.
* */

const renderMW = require("../renderMW");

module.exports = function(objectrepository) {
    return function(req, res, next) {
            if(typeof req.session.loggedIn === 'undefined' && req.session.loggedIn !== true) {
                return next();
            }
            res.locals.loggedIn = true;
            return next();
    };
};