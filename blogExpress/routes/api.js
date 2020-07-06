const router = require('express').Router();

//API para post

const apiPostsRouter = require('./api/posts');

router.use('/posts', apiPostsRouter);

module.exports = router;