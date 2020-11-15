const authMW = require('../middleware/auth/authMW');
const auth2MW = require('../middleware/auth/auth2MW');
const checkLoginMW = require('../middleware/auth/checkLoginMW');
const isLoggedInMW = require('../middleware/auth/isLoggedInMW');
const sendPwMW = require('../middleware/auth/sendPwMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const newCommentMW = require('../middleware/comment/newCommentMW');
const getPostCommentsMW = require('../middleware/comment/getPostCommentsMW');
const deletePostMW = require('../middleware/post/deletePostMW');
const getAllPostMW = require('../middleware/post/getAllPostMW');
const getPostMW = require('../middleware/post/getPostMW');
const getUsersPostMW = require('../middleware/post/getUsersPostMW');
const newPostMW = require('../middleware/post/newPostMW');
const updatePostMW = require('../middleware/post/updatePostMW');
const deleteUserMW = require('../middleware/user/deleteUserMW');
const getUsersMW = require('../middleware/user/getUsersMW');
const newUserMW = require('../middleware/user/newUserMW');
const getUserMW = require('../middleware/user/getUserMW');

const UserModel = require('../models/user')
const PostModel = require('../models/post');
const CommentModel = require('../models/comment');

module.exports = function (app) {
    const objRepo = {
        UserModel: UserModel,
        PostModel: PostModel,
        CommentModel: CommentModel
    };
    app.use('/posts/edit/:postid',
        authMW(objRepo),
        getPostMW(objRepo),
        updatePostMW(objRepo),
        renderMW(objRepo,'editpost')
    );
    app.use('/posts/del/:postid',
        authMW(objRepo),
        getPostMW(objRepo),
        deletePostMW(objRepo),
    );
    app.use('/posts',
        authMW(objRepo),
        getUsersPostMW(objRepo),
        renderMW(objRepo, 'posts')
    );
    app.use('/login',
        auth2MW(objRepo),
        checkLoginMW(objRepo),
        renderMW(objRepo,'login')
    );
    app.use('/signup',
        auth2MW(objRepo),
        newUserMW(objRepo),
        renderMW(objRepo,'signup')
    );
    app.use('/logout',authMW(objRepo), logoutMW(objRepo));
    app.use('/newpw',
        auth2MW(objRepo),
        sendPwMW(objRepo),
        renderMW(objRepo,'forgottenpw')
    );
    app.use('/admin/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        deleteUserMW(objRepo)
    );
    app.use('/admin',
        authMW(objRepo),
        getUsersMW(objRepo),
        renderMW(objRepo, 'admin')
    );
    
    
    app.use('/newpost',
        authMW(objRepo),
        newPostMW(objRepo),
        renderMW(objRepo,'newpost')
    );
    
    app.use('/:postid',
        getPostMW(objRepo),
        getPostCommentsMW(objRepo),
        newCommentMW(objRepo),
        renderMW(objRepo,'openedpost')
        );
    app.use('/',
        isLoggedInMW(objRepo),
        getAllPostMW(objRepo),
        renderMW(objRepo, 'index')
    );
};