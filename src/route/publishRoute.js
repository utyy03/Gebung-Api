const express = require('express');
const { publishValidate } = require('../validation/publishSchema.js');
const { validate } = require('../middleware/validate.js');
const auth = require('../middleware/authentication.js');
const limiter = require('../middleware/rateLimitter.js');

// memanggil controller about
const {
    getPublish, getByIdPublish,
    postPublish, updatePublish, deletePublish
} = require('../controller/publishController.js');

const router = express.Router();

// ENDPOINT API

// GET DATA
router.get('/publish', auth, limiter, getPublish);

// GET DATA BY ID
router.get('/publish/:publish_id', auth, limiter, getByIdPublish);

// POST DATA
router.post('/publish', auth, limiter, validate(publishValidate), postPublish);

// UPDATE DATA
router.put('/publish/:publish_id', auth, limiter, validate(publishValidate), updatePublish);

// DELETE DATA
router.delete('/publish/:publish_id', auth, limiter, deletePublish);

module.exports = router;