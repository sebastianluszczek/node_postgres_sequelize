const Joi = require('@hapi/joi');

const tutorialValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(2)
            .max(255)
            .required(),
        description: Joi.string()
    });

    return schema.validate(data);
}

const commentValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(255)
            .required(),
        text: Joi.string()
            .min(5)
            .max(255)
            .required()
    });

    return schema.validate(data);
}

module.exports = {
    tutorialValidator,
    commentValidator
};