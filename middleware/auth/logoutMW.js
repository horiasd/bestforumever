const requireOption = require('../requireOptions');

module.exports = function(objectReporsitory) {
    return function(req, res, next) {
        req.session.destroy( (err) => {
            res.redirect('/');
        });
    }
}