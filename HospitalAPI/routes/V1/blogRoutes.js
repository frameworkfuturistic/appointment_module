const express = require('express');
const blogController = require('../../controllers/V1/blogController');
const upload = require('../../middlewares/multer');

const router = express.Router();

// Public routes
router.get('/test', blogController.test);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/slug/:slug', blogController.getBlogBySlug);

// Admin-only routes (you should add authentication middleware here)
router.post('/', upload.single('image'), blogController.createBlog);
router.put('/:id', upload.single('image'), blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;