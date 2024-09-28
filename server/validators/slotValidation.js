const Joi = require('joi');

// Validation schema for creating slots
const validateSlotCreation = (req, res, next) => {
    const schema = Joi.object({
        doctorId: Joi.number().integer().required(),
        date: Joi.date().iso().required(),
        totalSlots: Joi.number().integer().min(1).required(), // Ensure at least one slot is created
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Validation schema for booking slots
const validateSlotBooking = (req, res, next) => {
    const schema = Joi.object({
        slotId: Joi.number().integer().required(),
        patientId: Joi.number().integer().required(),
        doctorId: Joi.number().integer().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateSlotCreation,
    validateSlotBooking,
};
