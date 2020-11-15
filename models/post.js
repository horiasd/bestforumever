const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Post = db.model('Post', {
    title: String,
    text: String,
    _postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Post;