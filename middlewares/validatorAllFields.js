const Joi = require("joi")

const validatorAllFields = async (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string(),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        age: Joi.number().integer().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().regex(/^\d{5}$/).required()
    });

    const { error } = await schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    next()
}

module.exports = { validatorAllFields }