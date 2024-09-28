const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/V1/doctorController');
const { validateDoctor } = require('../../validators/doctorValidator');
const { limiter } = require('../../middlewares/rateLimiter');

// Doctor routes
router.post('/doctors', limiter, validateDoctor, doctorController.addDoctor);
router.get('/doctors', doctorController.getDoctors);
router.get('/doctors/:id', limiter, doctorController.getDoctorsBySlote);
router.get('/doctors/:departmentId', limiter, validateDoctor, doctorController.getDoctorsByDepartment);
router.put('/doctors/:id', limiter, validateDoctor, doctorController.updateDoctor);
router.delete('/doctors/:id', limiter, doctorController.deleteDoctor);

module.exports = router;
