// controllers/jobApplicationController.js
const jobApplicationService = require('../../services/jobApplicationService');

const createJobApplication = async (req, res) => {
    try {
        const { applicantName, email, phone, coverLetter, linkedInProfile, portfolio } = req.body;

        // Ensure resume file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required." });
        }

        const resume = req.file.path; // Get the path of the uploaded file

        const jobApplication = await jobApplicationService.createJobApplication({
            jobId: req.body.jobId,
            applicantName,
            email,
            phone,
            resume,
            coverLetter,
            linkedInProfile,
            portfolio
        });

        res.status(201).json(jobApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobApplicationService.getAllJobs(); // Call the service method
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getApplicationsByJobId = async (req, res) => {
    try {
        const applications = await jobApplicationService.getApplicationsByJobId(req.params.jobId);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const updatedApplication = await jobApplicationService.updateApplicationStatus(req.params.id, req.body.status);
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJobApplication,
    getAllJobs,
    getApplicationsByJobId,
    updateApplicationStatus,
};
