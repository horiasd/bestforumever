/**
* Ha a user azonosítva van, akkor next hívás, különben redirecteli a / -re.
* */

module.exports = function(objectrepository) {
    return function(req, res, next) {
            if(typeof req.session.loggedIn === 'undefined' && req.session.loggedIn !== true) {
                return res.redirect('/');
            }
            return next();
    };
};