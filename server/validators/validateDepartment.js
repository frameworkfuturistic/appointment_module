// src/middlewares/validateDepartment.js
const Joi = require('joi');


const departmentSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().alphanum().required(), // This enforces the alphanumeric rule
    description: Joi.string().optional(),
});


exports.validateDepartment = (req, res, next) => {
    const { error } = departmentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message,
        });
    }
    next();
};
