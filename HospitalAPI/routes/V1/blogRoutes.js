const express = require('express');
const blogController = require('../../controllers/V1/blogController');
const upload = require('../../middlewares/multer'); // Adjust the path as necessary

const router = express.Router();

// Public routes for users
router.get('/test', blogController.test);
router.get('/', blogController.getBlogs); // Get all blogs
router.get('/:id', blogController.getBlogById); // Get a single blog by ID

// Admin-only routes
router.post('/', upload.single('image'), blogController.createBlog); // Create a new blog post with image upload
router.put('/:id', upload.single('image'), blogController.updateBlog); // Update a blog by ID with image upload
router.delete('/:id', blogController.deleteBlog); // Delete a blog by ID

module.exports = router;
