// routes/jobPostingRoutes.js
const express = require('express');
const jobPostingController = require('../../controllers/V1/jobPostingController');

const router = express.Router();

router.post('/', jobPostingController.createJobPosting);
router.get('/', jobPostingController.getAllJobPostings);
router.get('/:id', jobPostingController.getJobPostingById);
router.put('/:id', jobPostingController.updateJobPosting);
router.delete('/:id', jobPostingController.deleteJobPosting);

module.exports = router;
