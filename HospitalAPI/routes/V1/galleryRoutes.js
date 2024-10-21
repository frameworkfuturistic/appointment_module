const express = require('express');
const multer = require('multer');
const galleryController = require('../../controllers/V1/galleryController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a timestamp to avoid name conflicts
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Test route
router.get('/test', galleryController.test);

// Create a new gallery image
router.post('/', upload.single('image'), galleryController.createGalleryImage); // Use multer middleware for file uploads

// Get all gallery images (with pagination)
router.get('/', galleryController.getGalleryImages);

// Get a single gallery image by ID or slug
router.get('/:identifier', galleryController.getGalleryImageById);

// Update a gallery image by ID
router.put('/:id', upload.single('image'), galleryController.updateGalleryImage); // Use multer middleware for file uploads

// Delete a gallery image by ID
router.delete('/:id', galleryController.deleteGalleryImage);

module.exports = router;
