const prisma = require('../../config/prisma');
const apiResponse = require('../../utils/apiResponse');

// Create slots for a doctor
const createSlots = async (req, res) => {
    const { doctorId, date, totalSlots } = req.body;

    try {
        const slots = [];
        for (let i = 1; i <= totalSlots; i++) {
            const slot = await prisma.slot.create({
                data: {
                    doctor: { connect: { id: doctorId } },
                    date: new Date(date), // Ensure the date is a Date object
                    appointmentToken: i,   // Sequential token for each slot
                },
            });
            slots.push(slot);
        }
        res.status(201).json({
            status: "success",
            message: "Slots created successfully",
            data: slots,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get available slots for a specific doctor on a date
const getAvailableSlotsByDoctor = async (req, res) => {
    const { doctorId, date } = req.params;

    try {
        const availableSlots = await prisma.slot.findMany({
            where: {
                doctorId: parseInt(doctorId),
                date: new Date(date),
                isBooked: false, // Only get slots that are not booked
            },
        });
        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Book a slot for an appointment
const bookSlot = async (req, res) => {
    const { slotId, patientId, doctorId } = req.body;

    try {
        const slot = await prisma.slot.update({
            where: { id: parseInt(slotId) },
            data: {
                isBooked: true,
                appointments: {
                    create: {
                        patient: { connect: { id: patientId } },
                        doctor: { connect: { id: doctorId } },
                        slot: { connect: { id: slotId } },
                        status: 'confirmed', // Default status
                        date: new Date(),    // Current date/time of booking
                    },
                },
            },
        });
        res.status(200).json({
            status: "success",
            message: "Slot booked successfully",
            data: slot,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel a slot booking
const cancelSlotBooking = async (req, res) => {
    const { slotId } = req.params;

    try {
        const slot = await prisma.slot.update({
            where: { id: parseInt(slotId) },
            data: {
                isBooked: false,
                appointments: {
                    deleteMany: {
                        slotId: parseInt(slotId),
                    },
                },
            },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update slot details
const updateSlot = async (req, res) => {
    const { slotId } = req.params;
    const { date, appointmentToken } = req.body;

    try {
        const updatedSlot = await prisma.slot.update({
            where: { id: parseInt(slotId) },
            data: {
                date: new Date(date),
                appointmentToken,
            },
        });
        res.status(200).json(updatedSlot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSlots,
    getAvailableSlotsByDoctor,
    bookSlot,
    cancelSlotBooking,
    updateSlot,
};
