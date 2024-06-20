const express = require('express');
const { commentValidate } = require('../validation/commentSchema.js');
const { validate } = require('../middleware/validate.js');
const auth = require('../middleware/authentication.js');
const limiter = require('../middleware/rateLimitter.js');

// Memanggil controller comment
const {
    getComment, getByIdComment,
    postComment, updateComment, deleteComment
} = require('../controller/commentController.js');

const router = express.Router();

// ENDPOINT API

// GET DATA
router.get('/comment', auth, limiter, getComment);

// GET DATA BY ID
router.get('/comment/:comment_id', auth, limiter, getByIdComment);

// POST DATA
router.post('/comment', auth, limiter, validate(commentValidate), postComment);

// UPDATE DATA
router.put('/comment/:comment_id', auth, limiter, validate(commentValidate), updateComment);

// DELETE DATA
router.delete('/comment/:comment_id', auth, limiter, deleteComment);

module.exports = router;
