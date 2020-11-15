/**
* Egy bizonyos user post-jait tölti be az adatbázisból.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');

    return function(req, res, next) {

        PostModel.find({_postedBy: req.session.userId}, (err, posts) => {
            if(err || !posts) {
                return next(err);
            }
            res.locals.usersPosts = posts;
            return next();
        });
    };
};