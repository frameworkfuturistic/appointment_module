// services/jobApplicationService.js
const JobApplication = require('../models/JobApplication');

const createJobApplication = async (applicationData) => {
    const jobApplication = new JobApplication(applicationData);
    return await jobApplication.save();
};

// Fetch all job applications and populate jobId
const getAllJobs = async () => {
    return await JobApplication.find({})
        .populate('jobId') // Populate jobId with related JobPosting document
        .exec();
};


const getApplicationsByJobId = async (jobId) => {
    // Fetch job applications and populate the jobId field
    return await JobApplication.find({ jobId })
        .populate('jobId') // This populates the jobId with the associated JobPosting document
        .exec();
};

const updateApplicationStatus = async (applicationId, status) => {
    return await JobApplication.findByIdAndUpdate(applicationId, { status }, { new: true });
};

module.exports = {
    createJobApplication,
    getAllJobs,
    getApplicationsByJobId,
    updateApplicationStatus,
};
