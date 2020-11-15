/**
* Betölti egy adott poszhoz tartotó kommenteket az adatbázisból.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const CommentModel = requireOption(objectrepository, 'CommentModel');

    return function(req, res, next) {
        CommentModel.find({_belongsToThatPost: req.params.postid}, (err, postComments) => {
            if(err || !postComments) {
                return next(err);
            }
            res.locals.postComments = postComments;
            return next();
        });
    };
};
