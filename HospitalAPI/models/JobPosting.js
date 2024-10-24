// models/JobPosting.js
const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true},
    description: { type: String, required: true },
    requirements: { type: String },
    salaryRange: { type: String },
    experienceLevel: { type: String,  },
    postedBy: { type: String, required: true },
    closingDate: { type: Date },
}, { timestamps: true });

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;


// enum: ['Entry Level', 'Mid Level', 'Senior Level']
// enum: ['Full-Time', 'Part-Time', 'Contract'] 