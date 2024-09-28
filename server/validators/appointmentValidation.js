const Joi = require('joi');

// Validation schema for appointment creation
const appointmentCreationSchema = Joi.object({
    patientId: Joi.number().integer().required(),
    doctorId: Joi.number().integer().required(),
    departmentId: Joi.number().integer().required(),
    slotId: Joi.number().integer().required(),
    date: Joi.date().required(),
});

// Middleware for appointment creation validation
const validateAppointmentCreation = (req, res, next) => {
    const { error } = appointmentCreationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateAppointmentCreation,
};
