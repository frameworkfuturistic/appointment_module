// controllers/jobPostingController.js
const jobPostingService = require('../../services/jobPostingService');

const createJobPosting = async (req, res) => {
    try {
        const jobPosting = await jobPostingService.createJobPosting(req.body);
        res.status(201).json(jobPosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllJobPostings = async (req, res) => {
    try {
        const jobPostings = await jobPostingService.getAllJobPostings();

        // Wrap the successful response in a consistent format
        res.status(200).json({
            success: true,
            data: jobPostings, // Directly returning the job postings
            message: 'Job postings retrieved successfully',
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error retrieving job postings:', error);

        // Return a more structured error response
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving job postings',
            error: error.message, // Optional: include the error message for debugging
        });
    }
};


const getJobPostingById = async (req, res) => {
    try {
        const jobPosting = await jobPostingService.getJobPostingById(req.params.id);
        if (!jobPosting) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(jobPosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJobPosting = async (req, res) => {
    try {
        const updatedJobPosting = await jobPostingService.updateJobPosting(req.params.id, req.body);
        res.status(200).json(updatedJobPosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteJobPosting = async (req, res) => {
    try {
        await jobPostingService.deleteJobPosting(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJobPosting,
    getAllJobPostings,
    getJobPostingById,
    updateJobPosting,
    deleteJobPosting,
};
