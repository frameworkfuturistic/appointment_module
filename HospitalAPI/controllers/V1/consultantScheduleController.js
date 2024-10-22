// controllers/consultantScheduleController.js
const ConsultantSchedule = require('../../models/ConsultantSchedule');

// Create a new consultant schedule
exports.createConsultantSchedule = async (req, res) => {
    try {
        const newSchedule = new ConsultantSchedule(req.body);
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create bulk new consultant schedule
exports.createConsultantScheduleBulk = async (req, res) => {
    try {
        const consultantSchedules = req.body; // Expecting an array of schedules
        const createdSchedules = await ConsultantSchedule.insertMany(consultantSchedules);
        res.status(201).json(createdSchedules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all consultant schedules
exports.getAllConsultantSchedules = async (req, res) => {
    try {
        const schedules = await ConsultantSchedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a consultant schedule by ID
exports.getConsultantScheduleById = async (req, res) => {
    try {
        const schedule = await ConsultantSchedule.findById(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a consultant schedule
exports.updateConsultantSchedule = async (req, res) => {
    try {
        const updatedSchedule = await ConsultantSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSchedule) return res.status(404).json({ message: 'Schedule not found' });
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a consultant schedule
exports.deleteConsultantSchedule = async (req, res) => {
    try {
        const schedule = await ConsultantSchedule.findByIdAndDelete(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
