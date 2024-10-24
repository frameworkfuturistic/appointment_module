// models/JobApplication.js
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    applicantName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true }, // Path to the uploaded resume file
    coverLetter: { type: String },
    linkedInProfile: { type: String },
    portfolio: { type: String },
    status: {
        type: String,
        enum: ['Applied', 'In Review', 'Shortlisted', 'Rejected', 'Accepted', 'Reviewed', 'Interviewed', 'Hired'],
        default: 'Applied',
      },
      
    appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
