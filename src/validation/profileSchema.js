const Joi = require('joi');

// Rules for validation
const profileValidate = Joi.object({
    image_profile: Joi.string()
        .max(255)
        .required(),
    fullname: Joi.string()
        .max(100)
        .required(),
    role: Joi.string().valid('buyer', 'seller').default('buyer'),
    address: Joi.string()
        .max(255)
        .required(),
    birth: Joi.date()
        .required(),
    gender: Joi.string().valid('male', 'female')
        .required(),
}).options({ abortEarly: false });

module.exports = { profileValidate };