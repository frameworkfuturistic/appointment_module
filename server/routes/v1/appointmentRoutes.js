const express = require('express');
const {
    createAppointment,
    getAppointmentsByPatientId,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    getAllAppointments,
    getAppointmentsByRegistrationId,
    getAppointmentsByDoctorId,
} = require('../../controllers/V1/appointmentController');
const { validateAppointmentCreation } = require('../../validators/appointmentValidation');

const { limiter } = require('../../middlewares/rateLimiter');

const router = express.Router();

// Apply rate limiting middleware
router.use(limiter);

// Create an appointment
router.post('/create', validateAppointmentCreation, createAppointment);

// Get all appointments
router.get('/', getAllAppointments);

// Get all appointments for a specific patient
router.get('/patient/:patientId', getAppointmentsByPatientId);

// Get all appointments by registration ID
router.get('/:registrationId', getAppointmentsByRegistrationId);

// Get all appointments for a specific doctor
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);

// Get an appointment by ID
router.get('/:id', getAppointmentById);

// Update an existing appointment
router.put('/:id', updateAppointment);

// Cancel an appointment by ID
router.delete('/:id', cancelAppointment);

module.exports = router;
