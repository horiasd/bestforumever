/**
* POST paraméterekben lévő információk alapján új post-ot hoz létre.
* Redirectel a / - re.
*/

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');
    
    return function(req, res, next) {
        if(typeof req.body.newPostTitle === 'undefined' 
        || req.body.newTextArea === 'undefined'
        || req.body.newPostTitle === ''
        || req.body.newTextArea === '') {
            return next();
        }
        res.locals.newPost = new PostModel();
        res.locals.newPost.title = req.body.newPostTitle;
        res.locals.newPost.text = req.body.newTextArea;
        res.locals.newPost._postedBy = req.session.userId;
        
        res.locals.newPost.save( (err)=> {
            if(err) {
                return next(err);
            }
            return res.redirect('/');
        });
    };
};