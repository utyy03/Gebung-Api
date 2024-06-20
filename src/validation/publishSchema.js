const Joi = require("joi");

// rules validasi
const publishValidate = Joi.object({
    image_publish: Joi.string()
        .max(255)
        .required(),
    price: Joi.string()
        .max(50)
        .required(),
    supply: Joi.string()
        .max(50)
        .required(),
    grade: Joi.string()
        .valid('A', 'B', 'C')
        .required(),
    description: Joi.string()
        .max(255)
        .required(),
    address: Joi.string()
        .max(255)
        .required(),
    distance_from_user: Joi.number()
        .precision(2)
        .positive()
        .required(),
    likes: Joi.number().default(0)
        .integer()
        .positive(),
    comments: Joi.number().default(0)
        .integer()
        .positive(),
    views: Joi.number().default(0)
        .integer()
        .positive(),
}).options({ abortEarly: false });

module.exports = { publishValidate };