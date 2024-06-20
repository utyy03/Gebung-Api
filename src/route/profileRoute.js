const express = require('express');
const { profileValidate } = require('../validation/profileSchema.js');
const { validate } = require('../middleware/validate.js');
const auth = require('../middleware/authentication.js');
const limiter = require('../middleware/rateLimitter.js');

// Memanggil controller about
const {
    getProfile, getByIdProfile,
    postProfile, updateProfile, deleteProfile
} = require('../controller/profileController.js');

const router = express.Router();

// ENDPOINT API

// GET DATA
router.get('/profile', auth, limiter, getProfile);

// GET DATA BY ID
router.get('/profile/:profile_id', auth, limiter, getByIdProfile);

// POST DATA
router.post('/profile', auth, limiter, validate(profileValidate), postProfile);

// UPDATE DATA
router.put('/profile/:profile_id', auth, limiter, validate(profileValidate), updateProfile);

// DELETE DATA
router.delete('/profile/:profile_id', auth, limiter, deleteProfile);

module.exports = router;
