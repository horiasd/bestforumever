/**
* Betölti az összes post-ot az adatbázisból.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');

    return function(req, res, next) {
        
        PostModel.find({}, (err, posts) => {
            if(err) {
                return next(err);
            }
            res.locals.posts = posts;
            return next();
        });
    };
};
