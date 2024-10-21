const express = require('express');
const announcementController = require('../../controllers/V1/announcementController');

const router = express.Router();

// Test route
router.get('/test', announcementController.test);

// Create a new announcement
router.post('/', announcementController.createAnnouncement);

// Get all announcements (with pagination and optional type filtering)
router.get('/', announcementController.getAnnouncements);

// Get a single announcement by ID or slug
router.get('/:identifier', announcementController.getAnnouncementById); // identifier can be ID or slug

// Update an announcement by ID
router.put('/:id', announcementController.updateAnnouncement);

// Delete an announcement by ID
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
