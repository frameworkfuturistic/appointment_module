// validators/patientValidator.js
const Joi = require('joi');

const validatePatient = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        whatsappNumber: Joi.string().optional(),
        address: Joi.string().required(),
        occupation: Joi.string().optional(),
        gender: Joi.string().optional(),
        maritalStatus: Joi.string().optional(),
        religion: Joi.string().optional(),
        country: Joi.string().optional(),
        state: Joi.string().optional(),
        district: Joi.string().optional(),
        pinCode: Joi.string().optional(),
        dateOfBirth: Joi.date().optional(),
        medicalHistory: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = {
    validatePatient,
};
