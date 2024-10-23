// services/jobApplicationService.js
const JobApplication = require('../models/JobApplication');

const createJobApplication = async (applicationData) => {
    const jobApplication = new JobApplication(applicationData);
    return await jobApplication.save();
};

const getAllJobs = async () => {
    return await JobApplication.find().populate('jobId'); // Adjust this if you want to include more data
};

const getApplicationsByJobId = async (jobId) => {
    return await JobApplication.find({ jobId }).populate('jobId');
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
