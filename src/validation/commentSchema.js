const Joi = require('joi');

// Rules for validation
const commentValidate = Joi.object({
    comment_text: Joi.string()
        .max(500)
        .required(),
}).options({ abortEarly: false });

module.exports = { commentValidate };