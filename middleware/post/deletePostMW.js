/**
* Töröl egy posztot az adatbázisból.
* Redirectel a /:posts - ra.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    
    const PostModel = requireOption(objectrepository, 'PostModel');
    
    return function(req, res, next) {
        if(res.locals.post === 'undefined') {
            return next();
        }
        res.locals.post.remove((err) => {
            if(err) {
                return next(err);
            }
            return res.redirect('/posts');
        });
    };
};