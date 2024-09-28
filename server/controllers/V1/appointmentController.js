const { parse } = require('dotenv');
const prisma = require('../../config/prisma');
const apiResponse = require('../../utils/apiResponse');

// Generate a registration ID
const generateRegistrationId = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit number
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random capital letter
    return `${digits}${letter}`;
};

// Create an appointment
const createAppointment = async (req, res) => {
    const { patientId, doctorId, departmentId, slotId, date } = req.body;

    try {
        const slot = await prisma.slot.findUnique({ where: { id: parseInt(slotId) } });

        if (!slot || slot.isBooked) {
            return res.status(400).json({ message: 'Slot is not available' });
        }

        const registrationId = generateRegistrationId();
        const isoDate = new Date(date).toISOString();

        const appointment = await prisma.appointment.create({
            data: {
                patient: { connect: { id: patientId } },
                doctor: { connect: { id: doctorId } },
                department: { connect: { id: departmentId } },
                slot: { connect: { id: slotId } },
                date: isoDate,
                status: 'confirmed',
                registrationId,
            },
            include: {
                patient: true,
                doctor: true,
                department: true,
            },
        });

        await prisma.slot.update({
            where: { id: parseInt(slotId) },
            data: { isBooked: true },
        });

        res.status(201).json({
            message: 'Appointment created successfully',
            appointment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get appointments by patient ID
const getAppointmentsByPatientId = async (req, res) => {
    const { patientId } = req.params;

    try {
        const appointments = await prisma.appointment.findMany({
            where: { patientId: parseInt(patientId) },
            include: {
                doctor: true,
                department: true,
                slot: true,
            },
        });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await prisma.appointment.findUnique({
            where: { id: parseInt(id) },
            include: {
                doctor: true,
                department: true,
                slot: true,
                patient: true,
            },
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment
const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { patientId, doctorId, departmentId, slotId, date, status } = req.body;

    try {
        const slot = await prisma.slot.findUnique({ where: { id: parseInt(slotId) } });

        if (slot && slot.isBooked) {
            return res.status(400).json({ message: 'Slot is not available for booking' });
        }

        const appointmentDate = new Date(date);
        if (isNaN(appointmentDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const updatedAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                patient: { connect: { id: patientId } },
                doctor: { connect: { id: doctorId } },
                department: { connect: { id: departmentId } },
                slot: { connect: { id: slotId } },
                date: appointmentDate.toISOString(),
                status,
            },
        });

        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await prisma.appointment.findUnique({ where: { id: parseInt(id) } });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await prisma.appointment.delete({ where: { id: parseInt(id) } });

        await prisma.slot.update({
            where: { id: appointment.slotId },
            data: { isBooked: false },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                patient: true,
                doctor: true,
                department: true,
                slot: true,
            },
        });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get appointments by registration ID
const getAppointmentsByRegistrationId = async (req, res) => {
    const { registrationId } = req.params;

    try {
        const appointments = await prisma.appointment.findMany({
            where: { registrationId },
            include: {
                patient: true,
                doctor: true,
                department: true,
                slot: true,
            },
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this registration ID' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get appointments by doctor ID
const getAppointmentsByDoctorId = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const appointments = await prisma.appointment.findMany({
            where: { doctorId: parseInt(doctorId) },
            include: {
                patient: true,
                department: true,
                slot: true,
            },
        });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointmentsByPatientId,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    getAllAppointments,
    getAppointmentsByRegistrationId,
    getAppointmentsByDoctorId,
};
