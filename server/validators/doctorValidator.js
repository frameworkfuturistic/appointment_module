const Joi = require('joi');

const doctorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    bio: Joi.string().required(),
    profileImg: Joi.string().uri().required(),
    specialization: Joi.string().required(),
    departmentId: Joi.number().integer().required(),
});

exports.validateDoctor = (req, res, next) => {
    const { error } = doctorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
