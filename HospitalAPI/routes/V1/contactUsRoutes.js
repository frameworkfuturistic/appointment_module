// routes/contactUsRoutes.js
const express = require('express');
const contactUsController = require('../../controllers/V1/contactUsController');
const router = express.Router();

// Route to submit a contact us form
router.post('/', contactUsController.createContactUsEntry);

// Route to get all contact us entries (for admin or support team)
router.get('/', contactUsController.getAllContactUsEntries);

module.exports = router;
