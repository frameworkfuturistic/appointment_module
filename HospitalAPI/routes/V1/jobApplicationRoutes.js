// routes/jobApplicationRoutes.js
const express = require('express');
const jobApplicationController = require('../../controllers/V1/jobApplicationController');
const upload = require('../../middlewares/multer'); // Import the multer configuration

const router = express.Router();

router.post('/', upload.single('resume'), jobApplicationController.createJobApplication);
router.get('/:jobId', jobApplicationController.getApplicationsByJobId);
router.put('/:id/status', jobApplicationController.updateApplicationStatus);

module.exports = router;
