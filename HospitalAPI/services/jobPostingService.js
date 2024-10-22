// services/jobPostingService.js
const JobPosting = require('../models/JobPosting');

const createJobPosting = async (jobData) => {
    const jobPosting = new JobPosting(jobData);
    return await jobPosting.save();
};

const getAllJobPostings = async () => {
    return await JobPosting.find();
};

const getJobPostingById = async (jobId) => {
    return await JobPosting.findById(jobId);
};

const updateJobPosting = async (jobId, jobData) => {
    return await JobPosting.findByIdAndUpdate(jobId, jobData, { new: true });
};

const deleteJobPosting = async (jobId) => {
    return await JobPosting.findByIdAndDelete(jobId);
};

module.exports = {
    createJobPosting,
    getAllJobPostings,
    getJobPostingById,
    updateJobPosting,
    deleteJobPosting,
};
