const express = require('express');
const router = express.Router();

const loginRoutes = require('./userController');
const postRoutes = require('./postController');
const commentRoutes = require('./commentController');
const tagRoutes = require('./tagController');

router.get('/', (req,res) => {
    res.send('Welcome to zac\'s blog api-side!');
})


router.use('/api/comments', commentRoutes)
router.use('/api/users', loginRoutes)
router.use('/api/posts', postRoutes)
router.use('/api/tags', tagRoutes)

module.exports = router