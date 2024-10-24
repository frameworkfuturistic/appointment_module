const jobApplicationService = require('../../services/jobApplicationService');

// Utility function to handle responses
const sendResponse = (res, statusCode, data, message) => {
    if (data) {
        return res.status(statusCode).json(data);
    } else {
        return res.status(statusCode).json({ message });
    }
};

const createJobApplication = async (req, res) => {
    try {
        const { applicantName, email, phone, coverLetter, linkedInProfile, portfolio, jobId } = req.body;

        // Ensure resume file is uploaded
        if (!req.file) {
            return sendResponse(res, 400, null, "Resume file is required.");
        }

        const resume = req.file.path; // Get the path of the uploaded file

        const jobApplication = await jobApplicationService.createJobApplication({
            jobId,
            applicantName,
            email,
            phone,
            resume,
            coverLetter,
            linkedInProfile,
            portfolio
        });

        return sendResponse(res, 201, jobApplication);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobApplicationService.getAllJobs();
        return sendResponse(res, 200, jobs);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
};

const getApplicationsByJobId = async (req, res) => {
    try {
        const applications = await jobApplicationService.getApplicationsByJobId(req.params.jobId);
        return sendResponse(res, 200, applications);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const updatedApplication = await jobApplicationService.updateApplicationStatus(req.params.id, req.body.status);
        return sendResponse(res, 200, updatedApplication);
    } catch (error) {
        return sendResponse(res, 500, null, error.message);
    }
};

module.exports = {
    createJobApplication,
    getAllJobs,
    getApplicationsByJobId,
    updateApplicationStatus,
};
