/**
* POST paraméterekben lévő információ szerint új comment-et hoz létre.
* Redirectel a /:postid - ra.
* */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const CommentModel = requireOption(objectrepository, 'CommentModel');

    return function(req, res, next) {
        if(typeof req.session.loggedIn === 'undefined' && req.session.loggedIn !== true) {
            return next();
        }
        
        if(typeof req.body.newComment === 'undefined') {
            return next();
        } 
        res.locals.Comment = new CommentModel();
        res.locals.Comment.text = req.body.newComment;
        //res.locals.Comment._commentedBy = req.session.userId;
        res.locals.Comment._commentedBy = req.session.username;
        res.locals.Comment._belongsToThatPost = req.body.postID;
        
        res.locals.Comment.save( (err)=> {
            if(err) {
                return next(err);
            }
            return res.redirect('/'+req.body.postID);
        });

    };
};