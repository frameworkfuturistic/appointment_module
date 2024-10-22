const blogService = require('../../services/blogService');

// Test endpoint
exports.test = async (req, res) => {
  res.status(200).json("I'm here for testing");
};

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      status: req.body.status || 'draft', // Ensure the status is properly handled
      tags: req.body.tags ? JSON.parse(req.body.tags) : [], // Ensure tags are parsed
      image: req.file ? req.file.path.replace(/\\/g, '/') : null, // Normalize file path
    };

    const blog = await blogService.createBlog(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get paginated list of blogs with optional category filter
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 8, category } = req.query;
    const query = category ? { category } : {};

    const { total, blogs } = await blogService.getBlogs(query, parseInt(page, 10), parseInt(limit, 10));

    res.status(200).json({
      success: true,
      data: {
        blogs,
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog post by its ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      status: req.body.status || 'draft', // Ensure the status is properly handled
      tags: req.body.tags ? JSON.parse(req.body.tags) : [], // Ensure tags are parsed
      image: req.file ? req.file.path.replace(/\\/g, '/') : null, // Normalize file path
    };

    const blog = await blogService.updateBlog(req.params.id, blogData);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
