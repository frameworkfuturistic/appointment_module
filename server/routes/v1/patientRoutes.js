// routes/patientRoutes.js
const express = require('express');
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} = require('../../controllers/V1/patientController');
const { validatePatient } = require('../../validators/patientValidator'); // Assuming you have a patient validator
const { limiter } = require('../../middlewares/rateLimiter');

const router = express.Router();

// Apply rate limiting middleware
router.use(limiter);

// Create a new patient
router.post('/', validatePatient, createPatient); // Validate patient data before creating

// Get all patients
router.get('/', getAllPatients);

// Get patient by ID
router.get('/:id', getPatientById);

// Update patient
router.put('/:id', validatePatient, updatePatient); // Validate patient data before updating

// Delete patient
router.delete('/:id', deletePatient);

module.exports = router;
