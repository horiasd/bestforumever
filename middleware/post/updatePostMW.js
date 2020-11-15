/**
* POST paraméterekben lévő információ szerint frissíti az adott kommentet.
* Redirectel a /posts - ra.
* */
const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {

    const PostModel = requireOption(objectrepository, 'PostModel');
    
    return function(req, res, next) {
        if(typeof req.body.editTextArea === 'undefined') {
            return next();
        }

        res.locals.post.text = req.body.editTextArea;
        
        res.locals.post.save( (err)=> {
            if(err) {
                return next(err);
            }
            return res.redirect('/posts');
        });
    };
};