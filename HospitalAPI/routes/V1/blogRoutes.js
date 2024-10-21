
const express = require('express');
const blogController = require('../../controllers/V1/blogController');

const router = express.Router();

// Test route
router.get('/test', blogController.test);

// Create a new blog post
router.post('/', blogController.createBlog);

// Get all blogs (with pagination and optional category filtering)
router.get('/', blogController.getBlogs);

// Get a single blog by ID
router.get('/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/:id', blogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
