/**
* Betölt egy adott post-ot az adatbázisból.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');

    return function(req, res, next) {
        
        PostModel.findOne({_id: req.params.postid}, (err, post) => {
            if(err || !post) {
                return next(err);
            }
            res.locals.post = post;
            return next();
        });
    };
};
