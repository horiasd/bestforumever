const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Comment = db.model('Comment', {
    text: String,
    _commentedBy: {
        type: String,
        ref: 'User'
    },
    _belongsToThatPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});

module.exports = Comment;