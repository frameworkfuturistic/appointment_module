// models/ConsultantSchedule.js
const mongoose = require('mongoose');

const consultantScheduleSchema = new mongoose.Schema({
    consultantName: { type: String, required: true }, // Consultant's Name
    departmentName: { type: String, required: true }, // Department's Name
    designation: { type: String, required: true }, // Consultant's Designation
    opdTiming: { 
        from: { type: String, required: true }, // e.g., "09:00 AM"
        to: { type: String, required: true }    // e.g., "05:00 PM"
    },
    days: { 
        type: [String], 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
        required: true 
    }, // Days consultant is available
}, { timestamps: true });

const ConsultantSchedule = mongoose.model('ConsultantSchedule', consultantScheduleSchema);

module.exports = ConsultantSchedule;
