const prisma = require('../../config/prisma');
const apiResponse = require('../../utils/apiResponse');

// Create a new patient
const createPatient = async (req, res) => {
    const { name, email, phone, whatsappNumber, address, occupation, gender, maritalStatus, religion, country, state, district, pinCode, dateOfBirth, medicalHistory } = req.body;

    try {
        // Parse dateOfBirth into a Date object
        const parsedDateOfBirth = new Date(dateOfBirth);

        // Check if the date is valid
        if (isNaN(parsedDateOfBirth.getTime())) {
            return apiResponse.error(res, 'Invalid date of birth format', 400);
        }

        const patient = await prisma.patient.create({
            data: {
                name,
                email,
                phone,
                whatsappNumber,
                address,
                occupation,
                gender,
                maritalStatus,
                religion,
                country,
                state,
                district,
                pinCode,
                dateOfBirth: parsedDateOfBirth, // Use the parsed date
                medicalHistory,
            },
        });

        return apiResponse.success(res, 'Patient created successfully', patient);
    } catch (error) {
        return apiResponse.error(res, 'Error creating patient', error.message);
    }
};


// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await prisma.patient.findMany();
        return apiResponse.success(res, 'Patients fetched successfully', patients);
    } catch (error) {
        return apiResponse.error(res, 'Error fetching patients', error.message);
    }
};

// Get patient by ID
const getPatientById = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await prisma.patient.findUnique({
            where: { id: Number(id) },
        });

        if (!patient) {
            return apiResponse.error(res, 'Patient not found', 404);
        }

        return apiResponse.success(res, 'Patient fetched successfully', patient);
    } catch (error) {
        return apiResponse.error(res, 'Error fetching patient', error.message);
    }
};

// Update patient
const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { phone, address } = req.body;

    try {
        const updatedPatient = await prisma.patient.update({
            where: { id: Number(id) },
            data: {
                phone,
                address,
            },
        });

        return apiResponse.success(res, 'Patient updated successfully', updatedPatient);
    } catch (error) {
        return apiResponse.error(res, 'Error updating patient', error.message);
    }
};

// Delete patient
const deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.patient.delete({
            where: { id: Number(id) },
        });

        return apiResponse.success(res, 'Patient deleted successfully');
    } catch (error) {
        return apiResponse.error(res, 'Error deleting patient', error.message);
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};
